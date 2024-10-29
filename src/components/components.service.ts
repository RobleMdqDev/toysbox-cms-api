import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from './entities/component.entity';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentsRepository: Repository<Component>,
  ) {}

  findAll() {
    return this.componentsRepository.find({
      relations: ['contentType', 'fields'],
    });
  }

  findOne(id: number) {
    return this.componentsRepository.findOne({
      where: { id },
      relations: ['contentType', 'fields'],
    });
  }

  create(component: Partial<Component>) {
    const newComponent = this.componentsRepository.create(component);
    return this.componentsRepository.save(newComponent);
  }

  async update(id: number, component: Partial<Component>) {
    await this.componentsRepository.update(id, component);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.componentsRepository.delete(id);
  }
}