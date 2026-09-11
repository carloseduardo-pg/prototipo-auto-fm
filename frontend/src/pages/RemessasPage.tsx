import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { shipmentsApi } from '../lib/resources';
import {
  clock,
  invoiceLabel,
  money,
  weight,
  type Shipment,
  type ShipmentStatus,
  type SourceState,
} from '../lib/types';

const SIT: Record<
  ShipmentStatus,
  { cls: string; texto: string; etapa: number }
> = {
  READY: { cls: 'badge-ok', texto: 'Pronta para emitir', etapa: 3 },
  WAITING: { cls: 'badge-wait', texto: 'Aguardando fonte', etapa: 1 },
  FILE: { cls: 'badge-fail', texto: 'Arquivo inválido', etapa: 1 },
  DIVERGENCE: { cls: 'badge-fail', texto: 'Divergência', etapa: 2 },
  ISSUED: { cls: 'badge-ok', texto: 'CT-e emitido', etapa: 3 },
};

const FONTE_TITULO = {
  OTM: 'Oracle Logistics',
  SFTP: 'Arquivo no SFTP',
  SPREADSHEET: 'Planilha de controle',
} as const;

function fonteClasse(estado: SourceState) {
  if (estado === 'OK') return 'source source-ok';
  if (estado === 'WAIT') return 'source source-wait';
  return 'source source-fail';
}

function fonteTexto(estado: SourceState) {
  if (estado === 'OK') return 'Lida';
  if (estado === 'WAIT') return 'Aguardando';
  return 'Falhou';
}

function badgeFonte(estado: SourceState) {
  if (estado === 'OK') return 'badge-ok';
  if (estado === 'WAIT') return 'badge-wait';
  return 'badge-fail';
}

function Chevrons({ etapa }: { etapa: number }) {
  return (
    <span className="stage" aria-hidden>
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= etapa ? 'on' : ''} />
      ))}
    </span>
  );
}

/** Lista de remessas do dia + drawer de prévia. */
export function RemessasPage() {
  const [rows, setRows] = useState<Shipment[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [collecting, setCollecting] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Shipment | null>(null);
  const [driver, setDriver] = useState('');
  const [issuing, setIssuing] = useState(false);
  const [lastCollectLabel, setLastCollectLabel] = useState('');

  async function load(nextSearch = search) {
    try {
      const result = await shipmentsApi.list({
        search: nextSearch,
        page: 1,
        pageSize: 50,
      });
      setRows(result.data);
      setTotal(result.total);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro ao carregar remessas');
    }
  }

  useEffect(() => {
    void load('');
  }, []);

  const filtered = useMemo(() => rows, [rows]);

  async function openPreview(id: string) {
    setError('');
    try {
      const preview = await shipmentsApi.preview(id);
      setCurrent(preview);
      setDriver(preview.driverName ?? preview.preview?.driverName ?? '');
      setOpen(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha ao abrir a prévia');
    }
  }

  function closePreview() {
    setOpen(false);
    setCurrent(null);
    setDriver('');
  }

  async function collect() {
    setCollecting(true);
    setNotice('');
    try {
      await shipmentsApi.collect();
    } catch (cause) {
      setNotice(
        cause instanceof Error
          ? cause.message
          : 'A coleta neste portal ainda não está habilitada.',
      );
    } finally {
      setCollecting(false);
    }
  }

  async function issue() {
    if (!current) return;
    const name = driver.trim();
    if (!name) {
      setError('Informe o motorista antes de emitir.');
      return;
    }
    setIssuing(true);
    setError('');
    try {
      await shipmentsApi.issue(current.id, name);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Falha ao registrar a prévia',
      );
    } finally {
      setIssuing(false);
      await load();
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) closePreview();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    void (async () => {
      try {
        const { dashboardApi } = await import('../lib/resources');
        const summary = await dashboardApi.summary();
        if (summary.lastCollection) {
          setLastCollectLabel(`Última coleta ${clock(summary.lastCollection.ranAt)}`);
        }
      } catch {
        setLastCollectLabel('');
      }
    })();
  }, []);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="display">Remessas do dia</h1>
          <p className="lead">
            O robô lê o Oracle Logistics, o SFTP e a planilha de controle, cruza as
            três fontes e monta o CT-e. Você confere a prévia, informa o motorista e emite.
          </p>
        </div>
      </div>

      {notice ? <p className="shell-alert">{notice}</p> : null}
      {error && !open ? <p className="field-error">{error}</p> : null}

      <div className="table-wrap">
        <div className="table-tools">
          <input
            className="input"
            type="search"
            placeholder="Buscar por remessa, nota ou destino"
            aria-label="Buscar remessas"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              void load(value);
            }}
          />
          <div className="spacer" />
          <span className="meta">{lastCollectLabel}</span>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={collecting}
            onClick={() => void collect()}
          >
            {collecting ? 'Coletando…' : 'Coletar agora'}
          </button>
          <span className="meta">
            {total} {total === 1 ? 'remessa' : 'remessas'}
          </span>
        </div>

        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Remessa</th>
                <th>Nota fiscal</th>
                <th>Destino</th>
                <th>Fontes</th>
                <th>Situação</th>
                <th className="cell-right">Valor do frete</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="empty">
                      <h3>Nenhuma remessa encontrada</h3>
                      <p>
                        Ajuste a busca. A coleta nativa deste portal ainda não está
                        habilitada — os dados vêm do seed / RPA.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((row) => {
                  const sit = SIT[row.status];
                  return (
                    <tr key={row.id}>
                      <td>
                        <span className="cell-strong num">{row.code}</span>
                        <div className="cell-sub">
                          {row.volumeCount} volumes · {weight(row.weightKg)}
                        </div>
                      </td>
                      <td>
                        <span className="num">{invoiceLabel(row.invoiceNumber)}</span>
                        <div className="cell-sub">{row.customerName}</div>
                      </td>
                      <td>{row.destination}</td>
                      <td>
                        <span className="sources">
                          <span className={fonteClasse(row.sources.OTM)} title="Oracle Logistics">
                            OTM
                          </span>
                          <span className={fonteClasse(row.sources.SFTP)} title="Arquivo no SFTP">
                            FTP
                          </span>
                          <span
                            className={fonteClasse(row.sources.SPREADSHEET)}
                            title="Planilha de controle"
                          >
                            XLS
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className="row-3">
                          <Chevrons etapa={sit.etapa} />
                          <span className={`badge ${sit.cls}`}>{sit.texto}</span>
                        </span>
                      </td>
                      <td className="cell-right num">{money(row.freightValue)}</td>
                      <td className="cell-right">
                        <button
                          type="button"
                          className={`btn ${row.canIssue ? 'btn-primary' : 'btn-secondary'}`}
                          onClick={() => void openPreview(row.id)}
                        >
                          {row.canIssue ? 'Conferir' : 'Ver detalhes'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`scrim${open ? ' open' : ''}`}
        onClick={closePreview}
        aria-hidden={!open}
      />

      <aside
        className={`drawer${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        hidden={!open && !current}
      >
        <div className="drawer-head">
          <div>
            <h2 className="title" id="drawer-title">
              Conferir antes de emitir
            </h2>
            <p className="meta">
              {current
                ? `Remessa ${current.code} · nota ${invoiceLabel(current.invoiceNumber)} · ${current.customerName}`
                : 'Remessa —'}
            </p>
          </div>
          <button className="close" type="button" aria-label="Fechar prévia" onClick={closePreview}>
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="drawer-body">
          {current ? (
            <>
              <PreviewNote shipment={current} />
              <div className="review">
                <div className="review-title">Dados montados pelo robô</div>
                <dl className="row">
                  <dt>Remetente</dt>
                  <dd>
                    {current.customerName}
                    <span className="from">
                      nota fiscal {invoiceLabel(current.invoiceNumber)} recebida no SFTP
                    </span>
                  </dd>
                </dl>
                <dl className="row">
                  <dt>Destino</dt>
                  <dd>
                    {current.destination}
                    <span className="from">Oracle Logistics</span>
                  </dd>
                </dl>
                <dl className="row">
                  <dt>Volumes</dt>
                  <dd className="num">
                    {current.volumeCount}
                    <span className="from">Oracle Logistics</span>
                  </dd>
                </dl>
                <dl className="row">
                  <dt>Peso</dt>
                  <dd className="num">
                    {weight(current.weightKg)}
                    <span className="from">Oracle Logistics</span>
                  </dd>
                </dl>
                <dl className="row">
                  <dt>Valor do frete</dt>
                  <dd className="num">
                    {money(current.freightValue)}
                    <span className="from">tela de custos do CT-e</span>
                  </dd>
                </dl>
              </div>

              <div className="review">
                <div className="review-title">Conferência das fontes</div>
                {(
                  [
                    ['OTM', current.sources.OTM],
                    ['SFTP', current.sources.SFTP],
                    ['SPREADSHEET', current.sources.SPREADSHEET],
                  ] as const
                ).map(([key, state]) => (
                  <dl className="row" key={key}>
                    <dt>{FONTE_TITULO[key]}</dt>
                    <dd>
                      <span className={`badge ${badgeFonte(state)}`}>
                        {fonteTexto(state)}
                      </span>
                    </dd>
                  </dl>
                ))}
              </div>

              <div className="field">
                <label htmlFor="motorista">Motorista</label>
                <input
                  className="input"
                  id="motorista"
                  placeholder="Nome do motorista"
                  autoComplete="off"
                  disabled={!current.canIssue}
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                />
                <p className="field-hint">
                  Único dado que o robô não coleta — é você quem informa.
                </p>
              </div>
              {error && open ? <p className="field-error">{error}</p> : null}
            </>
          ) : null}
        </div>

        <div className="drawer-foot">
          <button type="button" className="btn btn-secondary" onClick={closePreview}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!current?.canIssue || issuing}
            onClick={() => void issue()}
          >
            {issuing ? 'Emitindo…' : 'Emitir CT-e'}
          </button>
        </div>
      </aside>
    </section>
  );
}

function PreviewNote({ shipment }: { shipment: Shipment }) {
  if (shipment.status === 'DIVERGENCE') {
    return (
      <div className="note note-wait">
        <span>
          {shipment.discrepancyNote ?? 'Há divergência entre as fontes.'} Confira na
          origem antes de emitir.
        </span>
      </div>
    );
  }
  if (shipment.status === 'FILE') {
    return (
      <div className="note note-wait">
        <span>
          O arquivo desta nota chegou ao SFTP fora do padrão NOTEFIZ e não pôde ser
          lido. Peça o reenvio ou lance os dados manualmente.
        </span>
      </div>
    );
  }
  if (shipment.status === 'WAITING') {
    return (
      <div className="note note-wait">
        <span>
          Ainda falta pelo menos uma fonte. A emissão fica bloqueada até as três
          conferirem.
        </span>
      </div>
    );
  }
  return (
    <div className="note">
      <span>As três fontes conferem. Informe o motorista e emita.</span>
    </div>
  );
}
