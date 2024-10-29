import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_image')
export class FieldImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt_text: string;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}