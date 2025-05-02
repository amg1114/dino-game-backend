import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/constants/jwt.constants';
import { VideoGamesModule } from 'src/video-games/video-games.module';
import { VideoGamesService } from 'src/video-games/services/video-games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/noticias/entities/like.entity';
import { Calificacion } from 'src/video-games/entities/calificacion.entity';

@Module({
  imports: [
    JwtModule.register(jwtConstants),
    UsersModule,
    VideoGamesModule,
    TypeOrmModule.forFeature([Like, Calificacion]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, VideoGamesService],
})
export class AuthModule {}
