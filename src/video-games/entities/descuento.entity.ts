import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { VideoGame } from './video-game.entity';

@Entity('descuentos')
export class Descuento {
  @PrimaryGeneratedColumn()
  id: number;

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

  @DeleteDateColumn({ nullable: true }) // Agregar Soft Delete
  @Column()
  deletedAt?: Date;
}
