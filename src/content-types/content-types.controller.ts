import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContentTypesService } from './content-types.service';
import { ContentType } from './entities/content-type.entity';
import { CreateContentTypeDto } from './dto/create-content-type.dto';
import { UpdateContentTypeDto } from './dto/update-content-type.dto';

@ApiTags('content-types')
@Controller('content-types')
export class ContentTypesController {
  constructor(private readonly contentTypesService: ContentTypesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de contenido' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de contenido', type: [ContentType] })
  findAll() {
    return this.contentTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de contenido por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de contenido encontrado', type: ContentType })
  @ApiResponse({ status: 404, description: 'Tipo de contenido no encontrado' })
  findOne(@Param('id') id: string) {
    return this.contentTypesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de contenido' })
  @ApiResponse({ status: 201, description: 'Tipo de contenido creado', type: ContentType })
  create(@Body() createContentTypeDto: CreateContentTypeDto) {
    return this.contentTypesService.create(createContentTypeDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de contenido' })
  @ApiResponse({ status: 200, description: 'Tipo de contenido actualizado', type: ContentType })
  @ApiResponse({ status: 404, description: 'Tipo de contenido no encontrado' })
  update(@Param('id') id: string, @Body() updateContentTypeDto: UpdateContentTypeDto) {
    return this.contentTypesService.update(+id, updateContentTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de contenido' })
  @ApiResponse({ status: 200, description: 'Tipo de contenido eliminado' })
  @ApiResponse({ status: 404, description: 'Tipo de contenido no encontrado' })
  delete(@Param('id') id: string) {
    return this.contentTypesService.delete(+id);
  }
}