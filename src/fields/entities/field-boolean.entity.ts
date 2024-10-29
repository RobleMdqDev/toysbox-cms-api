import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_boolean')
export class FieldBoolean {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: boolean;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}