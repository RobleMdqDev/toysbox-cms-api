import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ContentType } from './content-type.entity';
import { FieldType } from '../../fields/entities/field-type.entity';

@Entity('content_type_fields')
export class ContentTypeField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ContentType, contentType => contentType.fields)
  contentType: ContentType;

  @ManyToOne(() => FieldType, fieldType => fieldType.contentTypeFields)
  fieldType: FieldType;
}