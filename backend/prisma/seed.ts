import {
  CollectionRunStatus,
  PrismaClient,
  ShipmentStatus,
  SourceKind,
  SourceState,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type SeedRow = {
  code: string;
  invoiceNumber: string;
  destination: string;
  freightValue: number;
  weightKg: number;
  volumeCount: number;
  otm: SourceState;
  sftp: SourceState;
  plan: SourceState;
  status: ShipmentStatus;
  discrepancy?: string;
};

const ROWS: SeedRow[] = [
  {
    code: 'RM-48213',
    invoiceNumber: '128447',
    destination: 'Caruaru, PE',
    freightValue: 1284.9,
    weightKg: 1240,
    volumeCount: 12,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.READY,
  },
  {
    code: 'RM-48214',
    invoiceNumber: '128451',
    destination: 'Petrolina, PE',
    freightValue: 2917.4,
    weightKg: 3180,
    volumeCount: 26,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.READY,
  },
  {
    code: 'RM-48215',
    invoiceNumber: '128455',
    destination: 'Campina Grande, PB',
    freightValue: 1640,
    weightKg: 1910,
    volumeCount: 17,
    otm: SourceState.OK,
    sftp: SourceState.FAIL,
    plan: SourceState.OK,
    status: ShipmentStatus.FILE,
  },
  {
    code: 'RM-48216',
    invoiceNumber: '128460',
    destination: 'Mossoró, RN',
    freightValue: 3402.75,
    weightKg: 4020,
    volumeCount: 33,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.READY,
  },
  {
    code: 'RM-48217',
    invoiceNumber: '128462',
    destination: 'Juazeiro, BA',
    freightValue: 2115.3,
    weightKg: 2460,
    volumeCount: 21,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.WAIT,
    status: ShipmentStatus.WAITING,
  },
  {
    code: 'RM-48218',
    invoiceNumber: '128468',
    destination: 'Fortaleza, CE',
    freightValue: 4870,
    weightKg: 6150,
    volumeCount: 48,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.DIVERGENCE,
    discrepancy:
      'Tributação da nota: R$ 4.870,00 no OTM e R$ 4.780,00 no arquivo do SFTP.',
  },
  {
    code: 'RM-48219',
    invoiceNumber: '128471',
    destination: 'Arcoverde, PE',
    freightValue: 986.2,
    weightKg: 820,
    volumeCount: 8,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.READY,
  },
  {
    code: 'RM-48220',
    invoiceNumber: '128474',
    destination: 'Natal, RN',
    freightValue: 2640,
    weightKg: 3010,
    volumeCount: 24,
    otm: SourceState.OK,
    sftp: SourceState.FAIL,
    plan: SourceState.OK,
    status: ShipmentStatus.FILE,
  },
  {
    code: 'RM-48221',
    invoiceNumber: '128479',
    destination: 'Salvador, BA',
    freightValue: 5230.6,
    weightKg: 7400,
    volumeCount: 61,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.READY,
  },
  {
    code: 'RM-48222',
    invoiceNumber: '128483',
    destination: 'Garanhuns, PE',
    freightValue: 1375,
    weightKg: 1520,
    volumeCount: 14,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.WAIT,
    status: ShipmentStatus.WAITING,
  },
  {
    code: 'RM-48223',
    invoiceNumber: '128487',
    destination: 'João Pessoa, PB',
    freightValue: 2048.9,
    weightKg: 2240,
    volumeCount: 19,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.READY,
  },
  {
    code: 'RM-48224',
    invoiceNumber: '128492',
    destination: 'Recife, PE',
    freightValue: 742.1,
    weightKg: 610,
    volumeCount: 6,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.READY,
  },
  {
    code: 'RM-48225',
    invoiceNumber: '128496',
    destination: 'Sousa, PB',
    freightValue: 1890,
    weightKg: 2050,
    volumeCount: 18,
    otm: SourceState.WAIT,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.WAITING,
  },
  {
    code: 'RM-48226',
    invoiceNumber: '128501',
    destination: 'Sobral, CE',
    freightValue: 3120.4,
    weightKg: 3640,
    volumeCount: 29,
    otm: SourceState.OK,
    sftp: SourceState.OK,
    plan: SourceState.OK,
    status: ShipmentStatus.DIVERGENCE,
    discrepancy:
      'Peso divergente: 3.640 kg no OTM e 3.510 kg na planilha de controle.',
  },
  {
    code: 'RM-48227',
    invoiceNumber: '128505',
    destination: 'Vitória de Santo Antão, PE',
    freightValue: 865,
    weightKg: 720,
    volumeCount: 7,
    otm: SourceState.OK,
    sftp: SourceState.WAIT,
    plan: SourceState.OK,
    status: ShipmentStatus.WAITING,
  },
  {
    code: 'RM-48228',
    invoiceNumber: '128509',
    destination: 'Feira de Santana, BA',
    freightValue: 4015.8,
    weightKg: 5230,
    volumeCount: 42,
    otm: SourceState.OK,
    sftp: SourceState.WAIT,
    plan: SourceState.WAIT,
    status: ShipmentStatus.WAITING,
  },
  {
    code: 'RM-48229',
    invoiceNumber: '128514',
    destination: 'Serra Talhada, PE',
    freightValue: 1560,
    weightKg: 1680,
    volumeCount: 15,
    otm: SourceState.OK,
    sftp: SourceState.WAIT,
    plan: SourceState.OK,
    status: ShipmentStatus.WAITING,
  },
  {
    code: 'RM-48230',
    invoiceNumber: '128518',
    destination: 'Maceió, AL',
    freightValue: 2780,
    weightKg: 3320,
    volumeCount: 27,
    otm: SourceState.WAIT,
    sftp: SourceState.WAIT,
    plan: SourceState.OK,
    status: ShipmentStatus.WAITING,
  },
];

/**
 * Seeds FM demo users and the 18 example shipments from the mockup.
 * Synthetic data only — no real driver/NF PII from the control spreadsheet.
 */
async function main() {
  console.log('==> FM seed — shipments domain');

  const passwordHash = await bcrypt.hash('fm123456', 10);

  await prisma.user.upsert({
    where: { email: 'operador@fm.local' },
    update: { name: 'Gutemberg', passwordHash, active: true },
    create: {
      email: 'operador@fm.local',
      name: 'Gutemberg',
      passwordHash,
      active: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@fm.local' },
    update: { name: 'Administrador FM', passwordHash, active: true },
    create: {
      email: 'admin@fm.local',
      name: 'Administrador FM',
      passwordHash,
      active: true,
    },
  });

  await prisma.cteIssuance.deleteMany();
  await prisma.ctePreview.deleteMany();
  await prisma.discrepancy.deleteMany();
  await prisma.sourceSnapshot.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.collectionRun.deleteMany();

  const readyCount = ROWS.filter((r) => r.status === ShipmentStatus.READY).length;
  const ranAt = new Date();
  ranAt.setHours(6, 12, 0, 0);

  const run = await prisma.collectionRun.create({
    data: {
      ranAt,
      status: CollectionRunStatus.COMPLETED,
      shipmentCount: ROWS.length,
      readyCount,
      notes:
        'Seed de exemplo (contrato futuro com o RPA do Vini). OTM 18 · SFTP 16 NOTEFIZ + 2 fora do padrão · planilha 18.',
    },
  });

  for (const row of ROWS) {
    const shipment = await prisma.shipment.create({
      data: {
        code: row.code,
        invoiceNumber: row.invoiceNumber,
        destination: row.destination,
        customerName: 'M. Dias',
        freightValue: row.freightValue,
        weightKg: row.weightKg,
        volumeCount: row.volumeCount,
        status: row.status,
        discrepancyNote: row.discrepancy ?? null,
        collectionRunId: run.id,
      },
    });

    await prisma.sourceSnapshot.createMany({
      data: [
        { shipmentId: shipment.id, source: SourceKind.OTM, state: row.otm },
        { shipmentId: shipment.id, source: SourceKind.SFTP, state: row.sftp },
        {
          shipmentId: shipment.id,
          source: SourceKind.SPREADSHEET,
          state: row.plan,
        },
      ],
    });

    if (row.discrepancy) {
      await prisma.discrepancy.create({
        data: { shipmentId: shipment.id, message: row.discrepancy },
      });
    }
  }

  console.log('OK  users: 2');
  console.log('OK  collection_runs: 1');
  console.log('OK  shipments:', ROWS.length);
  console.log(`OK  ready: ${readyCount}`);
  console.log('Login seed: operador@fm.local / fm123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
