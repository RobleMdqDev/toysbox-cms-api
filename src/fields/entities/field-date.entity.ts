import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_date')
export class FieldDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date_value: Date;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}