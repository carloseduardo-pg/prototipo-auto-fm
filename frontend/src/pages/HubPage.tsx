import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { dashboardApi } from '../lib/resources';
import { clock, type DashboardSummary } from '../lib/types';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

/** Hub Início — resumo da última coleta e totais das remessas. */
export function HubPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    void dashboardApi
      .summary()
      .then(setSummary)
      .catch((cause) =>
        setError(cause instanceof Error ? cause.message : 'Falha ao carregar o início'),
      );
  }, []);

  const last = summary?.lastCollection;
  const lead = last
    ? `O robô de coleta rodou às ${clock(last.ranAt)} e trouxe ${last.shipmentCount} remessas da M. Dias. ${last.readyCount} já ${last.readyCount === 1 ? 'está' : 'estão'} com as três fontes conferidas e prontas para emitir.`
    : 'Ainda não há coleta registrada. Os dados deste protótipo vêm do seed até o contrato com o RPA do Vini.';

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="display">
            {greeting()}, {firstName(user?.name ?? 'operador')}
          </h1>
          <p className="lead">{lead}</p>
        </div>
      </div>

      {error ? <p className="field-error">{error}</p> : null}

      {summary ? (
        <section className="metrics">
          <div className="metric">
            <div className="metric-label">Prontas para emitir</div>
            <div className="metric-value">{summary.ready}</div>
            <div className="metric-foot">OTM, SFTP e planilha conferem</div>
          </div>
          <div className="metric">
            <div className="metric-label">Aguardando fonte</div>
            <div className="metric-value">{summary.waiting}</div>
            <div className="metric-foot">Falta pelo menos uma das três</div>
          </div>
          <div className="metric">
            <div className="metric-label">Com divergência</div>
            <div className="metric-value">{summary.divergence}</div>
            <div className="metric-foot">Precisam de conferência manual</div>
          </div>
          <div className="metric">
            <div className="metric-label">Emitidas hoje</div>
            <div className="metric-value">{summary.issuedToday}</div>
            <div className="metric-foot">CT-e enviados ao GW Webtrans</div>
          </div>
        </section>
      ) : null}

      <section className="card">
        <div className="card-head">
          <h2 className="title">Última coleta</h2>
          {last ? (
            <span className="badge badge-ok" style={{ marginLeft: 'auto' }}>
              Concluída {clock(last.ranAt)}
            </span>
          ) : (
            <span className="badge badge-idle" style={{ marginLeft: 'auto' }}>
              Sem coleta
            </span>
          )}
        </div>
        <div className="card-body">
          <div className="review">
            <div className="review-title">Fontes lidas nesta execução</div>
            <dl className="row">
              <dt>Oracle Logistics</dt>
              <dd>
                {last?.shipmentCount ?? 0} remessas aprovadas
                <span className="from">custos e dados do CT-e nas duas telas</span>
              </dd>
            </dl>
            <dl className="row">
              <dt>SFTP</dt>
              <dd>
                Arquivos NOTEFIZ
                <span className="from">
                  {last?.notes ?? 'Coleta nativa deste repo ainda não está habilitada.'}
                </span>
              </dd>
            </dl>
            <dl className="row">
              <dt>Planilha de controle</dt>
              <dd>
                Conferência transitória
                <span className="from">fonte de transição até o RPA substituir</span>
              </dd>
            </dl>
          </div>
          <Link className="btn btn-primary" to="/remessas">
            Ir para Remessas
          </Link>
        </div>
      </section>
    </section>
  );
}
