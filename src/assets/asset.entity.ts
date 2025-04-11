import { Noticia } from '../noticias/entities/noticia.entity';
import { VideoGame } from '../video-games/entities/video-game.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  index: number;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.thumb)
  videoGameThumb: VideoGame;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.hero)
  videoGameHero: VideoGame;

  @OneToOne(() => Noticia, (noticia) => noticia.thumb)
  noticiaThumb: Noticia;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  videoGame: VideoGame;
}
