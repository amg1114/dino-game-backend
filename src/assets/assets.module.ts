import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset, VideoGameAsset } from './asset.entity';
import { VideoGamesModule } from '../video-games/video-games.module';
import { VideoGamesService } from '../video-games/services/video-games.service';
import { NoticiasModule } from '../noticias/noticias.module';
import { NoticiasService } from '../noticias/services/noticias.service';
import { FirebaseService } from './services/firebase.service';
import { VersionService } from 'src/video-games/services/version.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, VideoGameAsset]),
    VideoGamesModule,
    NoticiasModule,
  ],
  providers: [
    AssetsService,
    VideoGamesService,
    VersionService,
    NoticiasService,
    FirebaseService,
  ],
  controllers: [AssetsController],
})
export class AssetsModule {}
