import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { VideoGamesModule } from '../video-games/video-games.module';
import { VideoGamesService } from '../video-games/services/video-games.service';
import { NoticiasModule } from '../noticias/noticias.module';
import { NoticiasService } from '../noticias/noticias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), VideoGamesModule, NoticiasModule],
  providers: [AssetsService, VideoGamesService, NoticiasService],
  controllers: [AssetsController]
})
export class AssetsModule {}
