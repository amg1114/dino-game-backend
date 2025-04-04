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
import { Calificacion, Comentario } from './entities/calificacion.entity';
import { CalificacionesService } from './services/calificaciones.service';
import {
  CalificacionesController,
  ComentariosController,
} from './controllers/calificaciones.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoGame,
      Version,
      Requisito,
      Descuento,
      UserVideoGame,
      Calificacion,
      Comentario,
    ]),
    UsersModule,
    CategoriasModule,
  ],
  providers: [
    VideoGamesService,
    UsersService,
    DevelopersService,
    DescuentosService,
    CategoriasService,
    CalificacionesService,
  ],
  controllers: [
    VersionsController,
    DescuentosController,
    BibliotecaController,
    CalificacionesController,
    ComentariosController,
    VideoGamesController,
  ],
  exports: [
    TypeOrmModule,
    VideoGamesService,
    UsersService,
    DevelopersService,
    CategoriasModule,
  ],
})
export class VideoGamesModule {}
