import { User } from '../../users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  DeleteDateColumn,
} from 'typeorm';
import { VideoGame } from './video-game.entity';

@Entity('user_videogames')
export class UserVideoGame {
  @PrimaryGeneratedColumn()
  id: number;

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

  @DeleteDateColumn({ nullable: true }) // Agregar Soft Delete
  @Column()
  deletedAt?: Date;
}
