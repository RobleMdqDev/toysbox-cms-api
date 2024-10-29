import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Nombre del proyecto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del proyecto', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}