import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { VideoGame } from './video-game.entity';
import { BaseEntity } from '../../config/models/base-entity.entity';
import { Asset } from '../../assets/asset.entity';

@Entity('versions')
export class Version extends BaseEntity {
  @Column()
  version: string;

  @Column()
  descripcion: string;

  @Column()
  size: string;

  @Column()
  releaseDate: Date;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.versions, {
    onDelete: 'CASCADE',
  })
  videoGame: VideoGame;

  @OneToMany(() => Requisito, (requisito) => requisito.version, {
    eager: true,
  })
  requisitos: Requisito[];

  @OneToOne(() => Asset, (asset) => asset.videoGameFile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  file: string;
}

@Entity('requisitos')
export class Requisito extends BaseEntity {
  @Column()
  requisito: string;

  @ManyToOne(() => Version, (version) => version.requisitos, {
    onDelete: 'CASCADE',
  })
  version: Version;
}
