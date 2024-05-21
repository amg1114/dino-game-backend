import { Noticia } from '../noticias/noticia.entity';
import { VideoGame } from '..//video-games/entities/video-game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
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
}

@Entity('assets_videogames')
export class AssetVideoGame {
  @PrimaryColumn()
  assetID: number;

  @OneToOne(() => Asset)
  @JoinColumn({ name: 'assetID' })
  asset: Asset;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;
}

@Entity('assets_noticias')
export class AssetNoticia {
  @PrimaryColumn()
  assetID: number;

  @OneToOne(() => Asset)
  @JoinColumn({ name: 'assetID' })
  asset: Asset;

  @ManyToOne(() => Noticia, (noticia) => noticia.assets, {
    onDelete: 'CASCADE',
  })
  noticia: Noticia;
}
