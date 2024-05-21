import { Noticia } from '../noticias/noticia.entity';
import { VideoGame } from '..//video-games/entities/video-game.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;
  
  @Column({default: 0})
  index: number;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets, {onDelete: 'CASCADE'})
  videoGame: VideoGame;
 
  @ManyToOne(() => Noticia, (noticia) => noticia.assets,  {onDelete: 'CASCADE'})
  noticia: Noticia;
}
