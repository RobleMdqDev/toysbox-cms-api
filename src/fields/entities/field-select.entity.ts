import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_select')
export class FieldSelect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  selected_option: string;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}