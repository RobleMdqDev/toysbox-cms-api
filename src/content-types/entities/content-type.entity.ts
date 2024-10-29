import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Component } from '../../components/entities/component.entity';
import { ContentTypeField } from './content-type-field.entity';

@Entity('content_types')
export class ContentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  is_repeatable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Project, project => project.contentTypes)
  project: Project;

  @OneToMany(() => Component, component => component.contentType)
  components: Component[];

  @OneToMany(() => ContentTypeField, field => field.contentType)
  fields: ContentTypeField[];
}