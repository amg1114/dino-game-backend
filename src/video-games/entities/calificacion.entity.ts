import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../config/models/base-entity.entity';
import { User } from '../../users/entities/user.entity';
import { VideoGame } from './video-game.entity';

@Entity('calificaciones')
export class Calificacion extends BaseEntity {
  @Column({ type: 'int', default: 0, nullable: false })
  puntaje: number;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.calificaciones, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;

  @ManyToOne(() => User, (user) => user.calificaciones, { onDelete: 'CASCADE' })
  user: User;
}

@Entity('comentarios')
export class Comentario extends BaseEntity {
  @Column({ type: 'character', length: 500, nullable: false })
  comentario: string;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.comentarios, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;

  @ManyToOne(() => User, (user) => user.comentarios, { onDelete: 'CASCADE' })
  user: User;
}
