import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_key_text')
export class FieldKeyText {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key_text_value: string;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}