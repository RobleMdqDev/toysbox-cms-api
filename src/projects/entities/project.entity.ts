import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '../../content-types/entities/content-type.entity';

@Entity('projects')
export class Project {
  @ApiProperty({ description: 'ID único del proyecto' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del proyecto' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Descripción del proyecto' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Tipos de contenido asociados al proyecto', type: () => [ContentType] })
  @OneToMany(() => ContentType, contentType => contentType.project)
  contentTypes: ContentType[];
}