-- Portal FM Transportes — English domain + audit + integrity triggers
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE "SourceKind" AS ENUM ('OTM', 'SFTP', 'SPREADSHEET');
CREATE TYPE "SourceState" AS ENUM ('OK', 'WAIT', 'FAIL');
CREATE TYPE "ShipmentStatus" AS ENUM ('READY', 'WAITING', 'FILE', 'DIVERGENCE', 'ISSUED');
CREATE TYPE "CollectionRunStatus" AS ENUM ('COMPLETED', 'FAILED');
CREATE TYPE "IssuanceStatus" AS ENUM ('PENDING', 'BLOCKED', 'FAILED', 'ISSUED');

CREATE TABLE "users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password_hash" TEXT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

CREATE TABLE "collection_runs" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "ran_at" TIMESTAMPTZ NOT NULL,
  "status" "CollectionRunStatus" NOT NULL,
  "shipment_count" INTEGER NOT NULL,
  "ready_count" INTEGER NOT NULL,
  "notes" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "collection_runs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "shipments" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "code" TEXT NOT NULL,
  "invoice_number" TEXT NOT NULL,
  "destination" TEXT NOT NULL,
  "customer_name" TEXT NOT NULL,
  "freight_value" DECIMAL(14,2) NOT NULL,
  "weight_kg" DECIMAL(12,3) NOT NULL,
  "volume_count" INTEGER NOT NULL,
  "status" "ShipmentStatus" NOT NULL,
  "discrepancy_note" TEXT,
  "driver_name" TEXT,
  "collection_run_id" UUID,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "shipments_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "shipments_collection_run_id_fkey" FOREIGN KEY ("collection_run_id") REFERENCES "collection_runs"("id")
);
CREATE UNIQUE INDEX "shipments_code_key" ON "shipments"("code");
CREATE INDEX "shipments_status_idx" ON "shipments"("status");
CREATE INDEX "shipments_collection_run_id_idx" ON "shipments"("collection_run_id");

CREATE TABLE "source_snapshots" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "shipment_id" UUID NOT NULL,
  "source" "SourceKind" NOT NULL,
  "state" "SourceState" NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "source_snapshots_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "source_snapshots_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX "source_snapshots_shipment_id_source_key" ON "source_snapshots"("shipment_id", "source");

CREATE TABLE "discrepancies" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "shipment_id" UUID NOT NULL,
  "message" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "discrepancies_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "discrepancies_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE CASCADE
);
CREATE INDEX "discrepancies_shipment_id_idx" ON "discrepancies"("shipment_id");

CREATE TABLE "cte_previews" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "shipment_id" UUID NOT NULL,
  "driver_name" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "confirmed_at" TIMESTAMPTZ,
  "confirmed_by_id" UUID,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "cte_previews_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "cte_previews_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE CASCADE,
  CONSTRAINT "cte_previews_confirmed_by_id_fkey" FOREIGN KEY ("confirmed_by_id") REFERENCES "users"("id")
);
CREATE UNIQUE INDEX "cte_previews_shipment_id_key" ON "cte_previews"("shipment_id");

CREATE TABLE "cte_issuances" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "shipment_id" UUID NOT NULL,
  "preview_id" UUID NOT NULL,
  "user_id" UUID,
  "status" "IssuanceStatus" NOT NULL,
  "message" TEXT NOT NULL,
  "protocol" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "cte_issuances_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "cte_issuances_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE CASCADE,
  CONSTRAINT "cte_issuances_preview_id_fkey" FOREIGN KEY ("preview_id") REFERENCES "cte_previews"("id") ON DELETE CASCADE,
  CONSTRAINT "cte_issuances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id")
);
CREATE INDEX "cte_issuances_shipment_id_idx" ON "cte_issuances"("shipment_id");

CREATE TABLE "audit_log" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "tabela" TEXT NOT NULL,
  "registro_id" TEXT,
  "operacao" TEXT NOT NULL CHECK ("operacao" IN ('INSERT', 'UPDATE', 'DELETE')),
  "dados_antes" JSONB,
  "dados_depois" JSONB,
  "usuario_db" TEXT NOT NULL DEFAULT CURRENT_USER,
  "app_usuario" TEXT,
  "criado_em" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW()
);
CREATE INDEX "audit_log_tabela_criado_idx" ON "audit_log" ("tabela", "criado_em" DESC);
CREATE INDEX "audit_log_registro_idx" ON "audit_log" ("registro_id");

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

CREATE TRIGGER trg_users_bu_updated BEFORE UPDATE ON "users"
  FOR EACH ROW EXECUTE PROCEDURE fn_set_updated_at();
CREATE TRIGGER trg_shipments_bu_updated BEFORE UPDATE ON "shipments"
  FOR EACH ROW EXECUTE PROCEDURE fn_set_updated_at();
CREATE TRIGGER trg_source_snapshots_bu_updated BEFORE UPDATE ON "source_snapshots"
  FOR EACH ROW EXECUTE PROCEDURE fn_set_updated_at();
CREATE TRIGGER trg_cte_previews_bu_updated BEFORE UPDATE ON "cte_previews"
  FOR EACH ROW EXECUTE PROCEDURE fn_set_updated_at();

CREATE TRIGGER trg_shipments_bu_issue_guard BEFORE UPDATE ON "shipments"
  FOR EACH ROW EXECUTE PROCEDURE fn_shipment_issue_guard();

CREATE TRIGGER trg_users_aiud_audit AFTER INSERT OR UPDATE OR DELETE ON "users"
  FOR EACH ROW EXECUTE PROCEDURE fn_audit_row();
CREATE TRIGGER trg_shipments_aiud_audit AFTER INSERT OR UPDATE OR DELETE ON "shipments"
  FOR EACH ROW EXECUTE PROCEDURE fn_audit_row();
CREATE TRIGGER trg_source_snapshots_aiud_audit AFTER INSERT OR UPDATE OR DELETE ON "source_snapshots"
  FOR EACH ROW EXECUTE PROCEDURE fn_audit_row();
CREATE TRIGGER trg_discrepancies_aiud_audit AFTER INSERT OR UPDATE OR DELETE ON "discrepancies"
  FOR EACH ROW EXECUTE PROCEDURE fn_audit_row();
CREATE TRIGGER trg_cte_previews_aiud_audit AFTER INSERT OR UPDATE OR DELETE ON "cte_previews"
  FOR EACH ROW EXECUTE PROCEDURE fn_audit_row();
CREATE TRIGGER trg_cte_issuances_aiud_audit AFTER INSERT OR UPDATE OR DELETE ON "cte_issuances"
  FOR EACH ROW EXECUTE PROCEDURE fn_audit_row();
CREATE TRIGGER trg_collection_runs_aiud_audit AFTER INSERT OR UPDATE OR DELETE ON "collection_runs"
  FOR EACH ROW EXECUTE PROCEDURE fn_audit_row();
