import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/** Body de POST /shipments/:id/issue — confirma a prévia e tenta emitir. */
export class IssueShipmentDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  driverName!: string;
}
