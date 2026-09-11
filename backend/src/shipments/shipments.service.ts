import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IssuanceStatus,
  Prisma,
  ShipmentStatus,
  SourceKind,
  SourceState,
} from '../prisma/orm';
import {
  pageResult,
  skipTake,
  type PageParams,
} from '../common/pagination';
import { PrismaService } from '../prisma/prisma.service';
import { IssueShipmentDto } from './dto/shipment.dto';

const shipmentInclude = {
  sourceSnapshots: { orderBy: { source: 'asc' as const } },
  discrepancies: true,
} satisfies Prisma.ShipmentInclude;

const SOURCE_LABEL: Record<SourceKind, string> = {
  OTM: 'Oracle Logistics',
  SFTP: 'Arquivo no SFTP',
  SPREADSHEET: 'Planilha de controle',
};

/**
 * Lists shipments, builds the human preview and records issue attempts.
 * This prototype never calls the GW Webtrans API.
 */
@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Paged list with search on code, invoice or destination.
   */
  async findAll(
    params: { search?: string; status?: ShipmentStatus } & PageParams,
  ) {
    const where: Prisma.ShipmentWhereInput = {};
    if (params.search) {
      where.OR = [
        { code: { contains: params.search, mode: 'insensitive' } },
        { invoiceNumber: { contains: params.search, mode: 'insensitive' } },
        { destination: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    const { skip, take } = skipTake(params);
    const [total, data] = await this.prisma.$transaction([
      this.prisma.shipment.count({ where }),
      this.prisma.shipment.findMany({
        where,
        include: shipmentInclude,
        orderBy: { code: 'asc' },
        skip,
        take,
      }),
    ]);
    return pageResult(
      data.map((row) => this.toListItem(row)),
      total,
      params,
    );
  }

  /**
   * Single shipment for the preview drawer.
   */
  async findOne(id: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: {
        ...shipmentInclude,
        preview: true,
        issuances: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    if (!shipment) {
      throw new NotFoundException('Remessa não encontrada');
    }
    return this.toPreview(shipment);
  }

  /**
   * Alias of findOne — preview payload for the drawer.
   */
  async preview(id: string) {
    return this.findOne(id);
  }

  /**
   * Confirms the human preview and records that GW issuance is not enabled.
   * Never marks the shipment as ISSUED (trigger + product rule).
   */
  async issue(id: string, dto: IssueShipmentDto, userId: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: shipmentInclude,
    });
    if (!shipment) {
      throw new NotFoundException('Remessa não encontrada');
    }

    const blockers = this.blockers(shipment);
    if (blockers.length) {
      throw new ConflictException({
        message: 'Emissão bloqueada: as três fontes não conferem.',
        code: 'SOURCES_NOT_READY',
        blockers,
      });
    }

    const driverName = dto.driverName.trim();
    const payload = {
      code: shipment.code,
      invoiceNumber: shipment.invoiceNumber,
      destination: shipment.destination,
      customerName: shipment.customerName,
      freightValue: shipment.freightValue,
      weightKg: shipment.weightKg,
      volumeCount: shipment.volumeCount,
      sources: shipment.sourceSnapshots,
    };

    const preview = await this.prisma.ctePreview.upsert({
      where: { shipmentId: shipment.id },
      update: {
        driverName,
        payload,
        confirmedAt: new Date(),
        confirmedById: userId,
      },
      create: {
        shipmentId: shipment.id,
        driverName,
        payload,
        confirmedAt: new Date(),
        confirmedById: userId,
      },
    });

    await this.prisma.shipment.update({
      where: { id: shipment.id },
      data: { driverName },
    });

    await this.prisma.cteIssuance.create({
      data: {
        shipmentId: shipment.id,
        previewId: preview.id,
        userId,
        status: IssuanceStatus.BLOCKED,
        message:
          'A emissão no GW Webtrans ainda não está habilitada neste protótipo. A prévia e o motorista foram registrados.',
      },
    });

    throw new HttpException(
      {
        message:
          'A emissão no GW Webtrans ainda não está habilitada neste protótipo. A prévia e o motorista foram registrados.',
        code: 'GW_NOT_CONFIGURED',
        previewId: preview.id,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  /**
   * Collection is out of this repo (RPA / Vini). Failure is explicit.
   */
  collectNow() {
    throw new HttpException(
      {
        message:
          'A coleta neste portal ainda não está habilitada. Os dados vêm do RPA (Vini) ou do seed.',
        code: 'COLLECTION_NOT_IN_REPO',
      },
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  private blockers(shipment: {
    status: ShipmentStatus;
    sourceSnapshots: { source: SourceKind; state: SourceState }[];
    discrepancies: { message: string }[];
  }): string[] {
    const out: string[] = [];
    if (shipment.status === ShipmentStatus.ISSUED) {
      out.push('Esta remessa já foi emitida.');
    }
    if (shipment.discrepancies.length) {
      out.push(...shipment.discrepancies.map((d) => d.message));
    }
    if (shipment.status === ShipmentStatus.FILE) {
      out.push(
        'O arquivo desta nota chegou ao SFTP fora do padrão NOTEFIZ e não pôde ser lido.',
      );
    }
    const bySource = Object.fromEntries(
      shipment.sourceSnapshots.map((s) => [s.source, s.state]),
    ) as Partial<Record<SourceKind, SourceState>>;
    for (const kind of [
      SourceKind.OTM,
      SourceKind.SFTP,
      SourceKind.SPREADSHEET,
    ]) {
      const state = bySource[kind];
      if (state !== SourceState.OK) {
        const label = SOURCE_LABEL[kind];
        out.push(
          state === SourceState.WAIT
            ? `${label} ainda não chegou.`
            : `${label} falhou.`,
        );
      }
    }
    return [...new Set(out)];
  }

  private canIssue(shipment: {
    status: ShipmentStatus;
    sourceSnapshots: { source: SourceKind; state: SourceState }[];
    discrepancies: { message: string }[];
  }) {
    return (
      shipment.status === ShipmentStatus.READY &&
      this.blockers(shipment).length === 0
    );
  }

  private toListItem(
    shipment: Prisma.ShipmentGetPayload<{ include: typeof shipmentInclude }>,
  ) {
    return {
      id: shipment.id,
      code: shipment.code,
      invoiceNumber: shipment.invoiceNumber,
      destination: shipment.destination,
      customerName: shipment.customerName,
      freightValue: shipment.freightValue,
      weightKg: shipment.weightKg,
      volumeCount: shipment.volumeCount,
      status: shipment.status,
      discrepancyNote: shipment.discrepancyNote,
      driverName: shipment.driverName,
      sources: this.sourcesMap(shipment.sourceSnapshots),
      canIssue: this.canIssue(shipment),
    };
  }

  private toPreview(
    shipment: Prisma.ShipmentGetPayload<{
      include: typeof shipmentInclude;
    }> & {
      preview: { driverName: string; confirmedAt: Date | null } | null;
      issuances: { status: IssuanceStatus; message: string }[];
    },
  ) {
    const blockers = this.blockers(shipment);
    return {
      ...this.toListItem(shipment),
      blockers,
      preview: shipment.preview
        ? {
            driverName: shipment.preview.driverName,
            confirmedAt: shipment.preview.confirmedAt,
          }
        : null,
      lastIssuance: shipment.issuances[0] ?? null,
    };
  }

  private sourcesMap(
    snapshots: { source: SourceKind; state: SourceState }[],
  ) {
    const map: Record<SourceKind, SourceState> = {
      OTM: SourceState.WAIT,
      SFTP: SourceState.WAIT,
      SPREADSHEET: SourceState.WAIT,
    };
    for (const snap of snapshots) {
      map[snap.source] = snap.state;
    }
    return map;
  }
}
