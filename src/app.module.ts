import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DataSourceConfig } from './config/data.source';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { VideoGamesModule } from './video-games/video-games.module';
import { AssetsModule } from './assets/assets.module';
import { CategoriasModule } from './categorias/categorias.module';
import { NoticiasModule } from './noticias/noticias.module';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { StatisticsModule } from './statistics/statistics.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

ConfigModule.forRoot();
export const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    VideoGamesModule,
    AssetsModule,
    CategoriasModule,
    NoticiasModule,
    AuthModule,
    ReportsModule,
    StatisticsModule,
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
        dir: path.resolve(process.cwd(), 'src', 'mail'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
