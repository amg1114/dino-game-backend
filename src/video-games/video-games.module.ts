import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from './entities/video-game.entity';
import { VideoGamesService } from './video-games.service';
import { VideoGamesController } from './video-games.controller';
import { Descuento } from './entities/descuento.entity';
import { UserVideoGame } from './entities/user-videogames.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoGame, Descuento, UserVideoGame])],
  providers: [VideoGamesService],
  controllers: [VideoGamesController],
  exports: [TypeOrmModule, VideoGamesService],
})
export class VideoGamesModule {}
