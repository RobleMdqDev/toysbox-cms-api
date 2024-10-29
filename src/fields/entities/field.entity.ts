import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Component } from '../../components/entities/component.entity';
import { FieldType } from './field-type.entity';

@Entity('fields')
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  field_data_type: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Component, component => component.fields)
  component: Component;

  @ManyToOne(() => FieldType, fieldType => fieldType.fields)
  fieldType: FieldType;
}