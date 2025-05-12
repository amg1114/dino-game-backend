import { User } from '../../users/entities/user.entity';
import { Column, ManyToOne, Entity } from 'typeorm';
import { VideoGame } from './video-game.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';

@Entity('user_videogames')
export class UserVideoGame extends BaseEntity {
  @Column({ type: 'date' })
  fechaCompra: Date;

  @Column({ default: 0, type: 'float' })
  precio: number;

  @ManyToOne(() => User, (user) => user.userVideoGames, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.userVideoGames, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;
}
