import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { ShipmentStatus } from '@prisma/client';
import { parsePage } from '../common/pagination';
import { IssueShipmentDto } from './dto/shipment.dto';
import { ShipmentsService } from './shipments.service';

type AuthedRequest = Request & { user: { id: string } };

/** REST de remessas — listagem, prévia e tentativa de emissão (sem GW). */
@ApiTags('shipments')
@ApiCookieAuth('access_token')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipments: ShipmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista remessas paginadas (código, NF, destino)' })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: ShipmentStatus,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.shipments.findAll({
      search,
      status,
      ...parsePage(page, pageSize),
    });
  }

  @Post('collect')
  @ApiOperation({
    summary: 'Coleta — não implementada neste repo (RPA / Vini)',
  })
  collect() {
    return this.shipments.collectNow();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe / prévia da remessa' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.shipments.findOne(id);
  }

  @Get(':id/preview')
  @ApiOperation({ summary: 'Prévia humana do CT-e' })
  preview(@Param('id', ParseUUIDPipe) id: string) {
    return this.shipments.preview(id);
  }

  @Post(':id/issue')
  @ApiOperation({
    summary:
      'Confirma prévia + motorista. Não emite no GW neste protótipo.',
  })
  issue(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: IssueShipmentDto,
    @Req() req: AuthedRequest,
  ) {
    return this.shipments.issue(id, dto, req.user.id);
  }
}
