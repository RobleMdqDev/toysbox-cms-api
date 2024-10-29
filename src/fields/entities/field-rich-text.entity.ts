import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_rich_text')
export class FieldRichText {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  rich_text: any;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}