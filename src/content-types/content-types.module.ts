import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentType } from './entities/content-type.entity';
import { ContentTypeField } from './entities/content-type-field.entity';
import { ContentTypesService } from './content-types.service';
import { ContentTypesController } from './content-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContentType, ContentTypeField])],
  providers: [ContentTypesService],
  controllers: [ContentTypesController],
  exports: [ContentTypesService],
})
export class ContentTypesModule {}