import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_geo_point')
export class FieldGeoPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}