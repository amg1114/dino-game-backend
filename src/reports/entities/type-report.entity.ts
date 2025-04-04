import { Column, Entity, OneToMany } from 'typeorm';
import { Report } from './report.entity';

@Entity('type_reports')
export class TypeReport {
  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Report, (report) => report.typeReport, {
    onDelete: 'CASCADE',
  })
  reports: Report[];
}
