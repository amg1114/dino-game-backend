import { BaseEntity } from '../config/models/base-entity.entity';
import { VideoGame } from '../video-games/entities/video-game.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('categorias')
export class Categoria extends BaseEntity {
  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => VideoGame, (videoGame) => videoGame.categorias)
  @JoinTable({
    name: 'categorias_videogames',
  })
  videoGames: VideoGame[];
}
