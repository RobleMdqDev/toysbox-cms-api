import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentType } from './entities/content-type.entity';

@Injectable()
export class ContentTypesService {
  constructor(
    @InjectRepository(ContentType)
    private contentTypesRepository: Repository<ContentType>,
  ) {}

  findAll() {
    return this.contentTypesRepository.find({
      relations: ['project', 'components', 'fields'],
    });
  }

  findOne(id: number) {
    return this.contentTypesRepository.findOne({
      where: { id },
      relations: ['project', 'components', 'fields'],
    });
  }

  create(contentType: Partial<ContentType>) {
    const newContentType = this.contentTypesRepository.create(contentType);
    return this.contentTypesRepository.save(newContentType);
  }

  async update(id: number, contentType: Partial<ContentType>) {
    await this.contentTypesRepository.update(id, contentType);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.contentTypesRepository.delete(id);
  }
}