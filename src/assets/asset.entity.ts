import { Version } from '../video-games/entities/version.entity';
import { BaseEntity } from '../config/models/base-entity.entity';
import { Noticia } from '../noticias/entities/noticia.entity';
import { VideoGame } from '../video-games/entities/video-game.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity('assets')
export class Asset extends BaseEntity {
  @Column()
  title: string;

  @Column()
  url: string;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.thumb)
  videoGameThumb: VideoGame;

  @OneToOne(() => VideoGame, (videoGame) => videoGame.hero)
  videoGameHero: VideoGame;

  @OneToOne(() => Noticia, (noticia) => noticia.thumb)
  noticiaThumb: Noticia;

  @OneToMany(() => VideoGameAsset, (videoGameAsset) => videoGameAsset.asset)
  videoGameAssets: VideoGameAsset[];

  @OneToOne(() => Version, (version) => version.file)
  videoGameFile: Version;
}

@Entity('video_game_assets')
export class VideoGameAsset extends BaseEntity {
  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;

  @Column({ type: 'int', default: 0 })
  index: number;

  @ManyToOne(() => Asset, (asset) => asset.id, {
    onDelete: 'CASCADE',
  })
  asset: Asset;
}
