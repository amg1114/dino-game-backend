import { Module } from '@nestjs/common';
import { NoticiasService } from './services/noticias.service';
import { NoticiasController } from './controllers/noticias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './entities/noticia.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { Like } from './entities/like.entity';
import { LikesService } from './services/likes.service';
import { LikesController } from './controllers/likes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia, Like]), UsersModule],
  providers: [NoticiasService, UsersService, LikesService],
  exports: [TypeOrmModule, UsersModule],
  controllers: [NoticiasController, LikesController],
})
export class NoticiasModule {}
