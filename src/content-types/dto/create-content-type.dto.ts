import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateContentTypeDto {
  @ApiProperty({ description: 'Nombre del tipo de contenido' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del tipo de contenido', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Indica si el tipo de contenido es repetible' })
  @IsBoolean()
  @IsOptional()
  is_repeatable?: boolean;

  @ApiProperty({ description: 'ID del proyecto al que pertenece' })
  @IsNumber()
  project_id: number;
}