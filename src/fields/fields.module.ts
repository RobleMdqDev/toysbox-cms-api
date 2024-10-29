import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { FieldType } from './entities/field-type.entity';
import { FieldUID } from './entities/field-uid.entity';
import { FieldRichText } from './entities/field-rich-text.entity';
import { FieldLink } from './entities/field-link.entity';
import { FieldBoolean } from './entities/field-boolean.entity';
import { FieldTimestamp } from './entities/field-timestamp.entity';
import { FieldNumber } from './entities/field-number.entity';
import { FieldColor } from './entities/field-color.entity';
import { FieldImage } from './entities/field-image.entity';
import { FieldMediaLink } from './entities/field-media-link.entity';
import { FieldSelect } from './entities/field-select.entity';
import { FieldDate } from './entities/field-date.entity';
import { FieldEmbed } from './entities/field-embed.entity';
import { FieldGeoPoint } from './entities/field-geo-point.entity';
import { FieldKeyText } from './entities/field-key-text.entity';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Field,
      FieldType,
      FieldUID,
      FieldRichText,
      FieldLink,
      FieldBoolean,
      FieldTimestamp,
      FieldNumber,
      FieldColor,
      FieldImage,
      FieldMediaLink,
      FieldSelect,
      FieldDate,
      FieldEmbed,
      FieldGeoPoint,
      FieldKeyText,
    ]),
  ],
  providers: [FieldsService],
  controllers: [FieldsController],
  exports: [FieldsService],
})
export class FieldsModule {}