import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoGame } from './entities/video-game.entity';
import { UserVideoGame } from './entities/user-videogames.entity';
import { Requisito, Version } from './entities/version.entity';

import { Descuento } from './entities/descuento.entity';
import { DescuentosController } from './controllers/descuentos.controller';

import { VideoGamesService } from './services/video-games.service';
import { VideoGamesController } from './controllers/video-games.controller';
import { UsersModule } from '../users/users.module';

import { UsersService } from '../users/services/users.service';
import { DescuentosService } from './services/descuentos.service';
import { BibliotecaController } from './controllers/biblioteca.controller';
import { CategoriasModule } from '../categorias/categorias.module';
import { CategoriasService } from '../categorias/categorias.service';
import { VersionsController } from './controllers/versions.controller';
import { DevelopersService } from 'src/users/services/developers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoGame,
      Version,
      Requisito,
      Descuento,
      UserVideoGame,
    ]),
    UsersModule,
    CategoriasModule
  ],
  providers: [VideoGamesService, UsersService, DevelopersService, DescuentosService, CategoriasService],
  controllers: [BibliotecaController, VideoGamesController, DescuentosController, VersionsController],
  exports: [TypeOrmModule, VideoGamesService, UsersService, DevelopersService, CategoriasModule],
})
export class VideoGamesModule {}
