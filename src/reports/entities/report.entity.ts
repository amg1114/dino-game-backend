import { State } from '../../config/enums/state';
import { User } from '../../users/entities/user.entity';
import { VideoGame } from '../../video-games/entities/video-game.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeReport } from './type-report.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: State, default: State.PENDING })
  state: State;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.reports)
  videoGame: VideoGame;

  @ManyToOne(() => TypeReport, (typeReport) => typeReport.reports, {
    onDelete: 'CASCADE',
  })
  typeReport: TypeReport;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
