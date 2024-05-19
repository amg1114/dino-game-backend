import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia]), UsersModule],
  providers: [NoticiasService, UsersService],
  exports: [TypeOrmModule, UsersModule],
  controllers: [NoticiasController]
})
export class NoticiasModule {}
