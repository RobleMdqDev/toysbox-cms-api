import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateComponentDto {
  @ApiProperty({ description: 'Nombre del componente' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del componente', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID del tipo de contenido al que pertenece' })
  @IsNumber()
  content_type_id: number;
}