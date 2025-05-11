import { Column, Entity, ManyToOne } from 'typeorm';
import { VideoGame } from './video-game.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';

@Entity('descuentos')
export class Descuento extends BaseEntity {
  @Column({ type: 'float' })
  porcentaje: number;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.descuentos, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;
}
