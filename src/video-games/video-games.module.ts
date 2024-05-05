import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoGame } from './entities/video-game.entity';
import { VideoGamesService } from './video-games.service';
import { VideoGamesController } from './video-games.controller';
import { Descuento } from './entities/descuento.entity';
import { UserVideoGame } from './entities/user-videogames.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoGame, Descuento, UserVideoGame]), UsersModule],
  providers: [VideoGamesService, UsersService],
  controllers: [VideoGamesController],
  exports: [TypeOrmModule, VideoGamesService],
})
export class VideoGamesModule {}
