import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ComponentsService } from './components.service';
import { Component } from './entities/component.entity';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@ApiTags('components')
@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los componentes' })
  @ApiResponse({ status: 200, description: 'Lista de componentes', type: [Component] })
  findAll() {
    return this.componentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un componente por ID' })
  @ApiResponse({ status: 200, description: 'Componente encontrado', type: Component })
  @ApiResponse({ status: 404, description: 'Componente no encontrado' })
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo componente' })
  @ApiResponse({ status: 201, description: 'Componente creado', type: Component })
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un componente' })
  @ApiResponse({ status: 200, description: 'Componente actualizado', type: Component })
  @ApiResponse({ status: 404, description: 'Componente no encontrado' })
  update(@Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un componente' })
  @ApiResponse({ status: 200, description: 'Componente eliminado' })
  @ApiResponse({ status: 404, description: 'Componente no encontrado' })
  delete(@Param('id') id: string) {
    return this.componentsService.delete(+id);
  }
}