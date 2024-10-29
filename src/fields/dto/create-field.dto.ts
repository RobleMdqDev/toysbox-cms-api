import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({ description: 'Nombre del campo' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de dato del campo' })
  @IsString()
  field_data_type: string;

  @ApiProperty({ description: 'ID del componente al que pertenece' })
  @IsNumber()
  component_id: number;

  @ApiProperty({ description: 'ID del tipo de campo' })
  @IsNumber()
  field_type_id: number;

  @ApiProperty({ description: 'Valor del campo', type: 'object' })
  value: any;
}