import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_uid')
export class FieldUID {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}