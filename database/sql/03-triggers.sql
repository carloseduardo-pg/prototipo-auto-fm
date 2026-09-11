-- =============================================================================
-- Portal FM — functions/triggers (espelho da migration Prisma)
-- Fonte de verdade aplicada via
--   backend/prisma/migrations/20260911180000_init_shipments_domain_audit
-- Este arquivo serve para reaplicar functions sem recriar tabelas.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION fn_audit_row()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id TEXT;
  v_app TEXT;
  v_antes JSONB;
  v_depois JSONB;
BEGIN
  BEGIN
    v_app := NULLIF(current_setting('app.user_id', true), '');
  EXCEPTION WHEN OTHERS THEN
    v_app := NULL;
  END;

  IF TG_OP = 'INSERT' THEN
    v_id := NEW.id::text;
    v_depois := to_jsonb(NEW) - 'password_hash';
    INSERT INTO audit_log (tabela, registro_id, operacao, dados_antes, dados_depois, app_usuario)
    VALUES (TG_TABLE_NAME, v_id, TG_OP, NULL, v_depois, v_app);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    v_id := NEW.id::text;
    v_antes := to_jsonb(OLD) - 'password_hash';
    v_depois := to_jsonb(NEW) - 'password_hash';
    INSERT INTO audit_log (tabela, registro_id, operacao, dados_antes, dados_depois, app_usuario)
    VALUES (TG_TABLE_NAME, v_id, TG_OP, v_antes, v_depois, v_app);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    v_id := OLD.id::text;
    v_antes := to_jsonb(OLD) - 'password_hash';
    INSERT INTO audit_log (tabela, registro_id, operacao, dados_antes, dados_depois, app_usuario)
    VALUES (TG_TABLE_NAME, v_id, TG_OP, v_antes, NULL, v_app);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION fn_shipment_issue_guard()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'ISSUED' AND (OLD.status IS DISTINCT FROM 'ISSUED') THEN
    IF NOT EXISTS (
      SELECT 1 FROM cte_issuances
      WHERE shipment_id = NEW.id AND status = 'ISSUED'
    ) THEN
      RAISE EXCEPTION 'Integrity: cannot mark shipment issued without a successful issuance record'
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
