import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field } from './field.entity';
import { ContentTypeField } from '../../content-types/entities/content-type-field.entity';

@Entity('field_types')
export class FieldType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Field, field => field.fieldType)
  fields: Field[];

  @OneToMany(() => ContentTypeField, contentTypeField => contentTypeField.fieldType)
  contentTypeFields: ContentTypeField[];
}