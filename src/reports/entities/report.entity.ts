import { State } from '../../config/enums/state';
import { User } from '../../users/entities/user.entity';
import { VideoGame } from '../../video-games/entities/video-game.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TypeReport } from './type-report.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';

@Entity('reports')
export class Report extends BaseEntity {
  @Column({ type: 'enum', enum: State, default: State.PENDING })
  state: State;

  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.reports, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;

  @ManyToOne(() => TypeReport, (typeReport) => typeReport.reports, {
    onDelete: 'CASCADE',
  })
  typeReport: TypeReport;
}
