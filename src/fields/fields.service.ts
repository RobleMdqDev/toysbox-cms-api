import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './entities/field.entity';
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

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private fieldsRepository: Repository<Field>,
    @InjectRepository(FieldUID)
    private fieldUIDRepository: Repository<FieldUID>,
    @InjectRepository(FieldRichText)
    private fieldRichTextRepository: Repository<FieldRichText>,
    @InjectRepository(FieldLink)
    private fieldLinkRepository: Repository<FieldLink>,
    @InjectRepository(FieldBoolean)
    private fieldBooleanRepository: Repository<FieldBoolean>,
    @InjectRepository(FieldTimestamp)
    private fieldTimestampRepository: Repository<FieldTimestamp>,
    @InjectRepository(FieldNumber)
    private fieldNumberRepository: Repository<FieldNumber>,
    @InjectRepository(FieldColor)
    private fieldColorRepository: Repository<FieldColor>,
    @InjectRepository(FieldImage)
    private fieldImageRepository: Repository<FieldImage>,
    @InjectRepository(FieldMediaLink)
    private fieldMediaLinkRepository: Repository<FieldMediaLink>,
    @InjectRepository(FieldSelect)
    private fieldSelectRepository: Repository<FieldSelect>,
    @InjectRepository(FieldDate)
    private fieldDateRepository: Repository<FieldDate>,
    @InjectRepository(FieldEmbed)
    private fieldEmbedRepository: Repository<FieldEmbed>,
    @InjectRepository(FieldGeoPoint)
    private fieldGeoPointRepository: Repository<FieldGeoPoint>,
    @InjectRepository(FieldKeyText)
    private fieldKeyTextRepository: Repository<FieldKeyText>,
  ) {}

  async createField(fieldData: any) {
    const field = await this.fieldsRepository.save(fieldData.field);

    switch (field.field_data_type) {
      case 'UID':
        return this.fieldUIDRepository.save({ ...fieldData.value, field });
      case 'RichText':
        return this.fieldRichTextRepository.save({ ...fieldData.value, field });
      case 'Link':
        return this.fieldLinkRepository.save({ ...fieldData.value, field });
      case 'Boolean':
        return this.fieldBooleanRepository.save({ ...fieldData.value, field });
      case 'Timestamp':
        return this.fieldTimestampRepository.save({ ...fieldData.value, field });
      case 'Number':
        return this.fieldNumberRepository.save({ ...fieldData.value, field });
      case 'Color':
        return this.fieldColorRepository.save({ ...fieldData.value, field });
      case 'Image':
        return this.fieldImageRepository.save({ ...fieldData.value, field });
      case 'MediaLink':
        return this.fieldMediaLinkRepository.save({ ...fieldData.value, field });
      case 'Select':
        return this.fieldSelectRepository.save({ ...fieldData.value, field });
      case 'Date':
        return this.fieldDateRepository.save({ ...fieldData.value, field });
      case 'Embed':
        return this.fieldEmbedRepository.save({ ...fieldData.value, field });
      case 'GeoPoint':
        return this.fieldGeoPointRepository.save({ ...fieldData.value, field });
      case 'KeyText':
        return this.fieldKeyTextRepository.save({ ...fieldData.value, field });
      default:
        throw new Error(`Tipo de campo no soportado: ${field.field_data_type}`);
    }
  }

  async getFieldValue(field: Field) {
    const completeField = await this.fieldsRepository.findOne({
      where: { id: field.id },
      relations: ['component', 'fieldType']
    });

    if (!completeField) {
      throw new Error(`Campo no encontrado con id: ${field.id}`);
    }

    switch (completeField.field_data_type) {
      case 'UID':
        return this.fieldUIDRepository.findOne({ where: { field: { id: field.id } } });
      case 'RichText':
        return this.fieldRichTextRepository.findOne({ where: { field: { id: field.id } } });
      case 'Link':
        return this.fieldLinkRepository.findOne({ where: { field: { id: field.id } } });
      case 'Boolean':
        return this.fieldBooleanRepository.findOne({ where: { field: { id: field.id } } });
      case 'Timestamp':
        return this.fieldTimestampRepository.findOne({ where: { field: { id: field.id } } });
      case 'Number':
        return this.fieldNumberRepository.findOne({ where: { field: { id: field.id } } });
      case 'Color':
        return this.fieldColorRepository.findOne({ where: { field: { id: field.id } } });
      case 'Image':
        return this.fieldImageRepository.findOne({ where: { field: { id: field.id } } });
      case 'MediaLink':
        return this.fieldMediaLinkRepository.findOne({ where: { field: { id: field.id } } });
      case 'Select':
        return this.fieldSelectRepository.findOne({ where: { field: { id: field.id } } });
      case 'Date':
        return this.fieldDateRepository.findOne({ where: { field: { id: field.id } } });
      case 'Embed':
        return this.fieldEmbedRepository.findOne({ where: { field: { id: field.id } } });
      case 'GeoPoint':
        return this.fieldGeoPointRepository.findOne({ where: { field: { id: field.id } } });
      case 'KeyText':
        return this.fieldKeyTextRepository.findOne({ where: { field: { id: field.id } } });
      default:
        throw new Error(`Tipo de campo no soportado: ${completeField.field_data_type}`);
    }
  }
}