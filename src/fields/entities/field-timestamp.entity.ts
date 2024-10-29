import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_timestamp')
export class FieldTimestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  timestamp_value: Date;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}