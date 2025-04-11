import { Column, Entity, OneToMany } from 'typeorm';
import { Report } from './report.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';

@Entity('type_reports')
export class TypeReport extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Report, (report) => report.typeReport, {
    onDelete: 'CASCADE',
  })
  reports: Report[];
}
