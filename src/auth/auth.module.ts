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
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

ConfigModule.forRoot();
const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register(jwtConstants),

    UsersModule,
    VideoGamesModule,
    TypeOrmModule.forFeature([Like, Calificacion]),
    MailerModule.forRoot({
      transport: {
        host: configService.getOrThrow('EMAIL_HOST'),
        port: configService.getOrThrow('EMAIL_PORT'),
        secure: false,
        auth: {
          user: configService.getOrThrow('EMAIL_USER'),
          pass: configService.getOrThrow('EMAIL_PASSWORD'),
        },
      },
      defaults: {
        from: `"DinoGame" <${configService.getOrThrow('EMAIL_SENDER_ADDRESS')}>`,
      },
      template: {
        dir: path.resolve(process.cwd(), 'src', 'auth', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, VideoGamesService],
})
export class AuthModule {}
