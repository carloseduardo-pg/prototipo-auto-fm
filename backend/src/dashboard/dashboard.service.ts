import { Injectable } from '@nestjs/common';
import { ShipmentStatus } from '../prisma/orm';
import { PrismaService } from '../prisma/prisma.service';

/** Contagens do hub Início (evita N listagens completas). */
@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Totais do dia + última coleta (seed / RPA).
   */
  async summary() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [ready, waiting, file, divergence, issuedToday, lastCollection] =
      await Promise.all([
        this.prisma.shipment.count({
          where: { status: ShipmentStatus.READY },
        }),
        this.prisma.shipment.count({
          where: { status: ShipmentStatus.WAITING },
        }),
        this.prisma.shipment.count({
          where: { status: ShipmentStatus.FILE },
        }),
        this.prisma.shipment.count({
          where: { status: ShipmentStatus.DIVERGENCE },
        }),
        this.prisma.shipment.count({
          where: {
            status: ShipmentStatus.ISSUED,
            updatedAt: { gte: startOfDay },
          },
        }),
        this.prisma.collectionRun.findFirst({
          orderBy: { ranAt: 'desc' },
        }),
      ]);

    return {
      ready,
      waiting: waiting + file,
      file,
      divergence,
      issuedToday,
      lastCollection: lastCollection
        ? {
            ranAt: lastCollection.ranAt,
            status: lastCollection.status,
            shipmentCount: lastCollection.shipmentCount,
            readyCount: lastCollection.readyCount,
            notes: lastCollection.notes,
          }
        : null,
    };
  }
}
