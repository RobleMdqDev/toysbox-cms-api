import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_link_to_media')
export class FieldMediaLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  media_url: string;

  @Column()
  media_type: string;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}