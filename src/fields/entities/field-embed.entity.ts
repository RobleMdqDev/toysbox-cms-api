import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field } from './field.entity';

@Entity('field_embed')
export class FieldEmbed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  embed_url: string;

  @Column()
  embed_type: string;

  @Column({ type: 'jsonb', nullable: true })
  embed_data: any;

  @OneToOne(() => Field)
  @JoinColumn()
  field: Field;
}