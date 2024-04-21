import { VideoGame } from 'src/video-games/video-game.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;
  
  @ManyToOne(() => VideoGame, (videoGame) => videoGame.assets)
  videoGame: VideoGame;
}
