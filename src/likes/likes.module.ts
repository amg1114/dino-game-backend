import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { UsersModule } from 'src/users/users.module';
import { NoticiasModule } from 'src/noticias/noticias.module';
import { NoticiasService } from 'src/noticias/noticias.service';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UsersModule, NoticiasModule],
  controllers: [LikesController],
  providers: [LikesService, NoticiasService, UsersService],
})
export class LikesModule {}
