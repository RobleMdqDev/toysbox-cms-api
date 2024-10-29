import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FieldsService } from './fields.service';
import { Field } from './entities/field.entity';
import { CreateFieldDto } from './dto/create-field.dto';

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo campo' })
  @ApiResponse({ status: 201, description: 'Campo creado', type: Field })
  createField(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldsService.createField(createFieldDto);
  }

  @Get(':id/value')
  @ApiOperation({ summary: 'Obtener el valor de un campo' })
  @ApiResponse({ status: 200, description: 'Valor del campo obtenido' })
  @ApiResponse({ status: 404, description: 'Campo no encontrado' })
  async getFieldValue(@Param('id') id: string) {
    const field = new Field();
    field.id = +id;
    return this.fieldsService.getFieldValue(field);
  }
}