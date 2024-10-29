import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { ContentType } from '../../content-types/entities/content-type.entity';
import { Field } from '../../fields/entities/field.entity';

@Entity('components')
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ContentType, contentType => contentType.components)
  contentType: ContentType;

  @OneToMany(() => Field, field => field.component)
  fields: Field[];
}