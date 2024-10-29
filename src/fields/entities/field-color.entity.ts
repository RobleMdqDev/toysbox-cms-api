import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_color')
export class FieldColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 7 })
  color_value: string;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}