import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { VideogamesModule } from './video-games/video-games.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    VideogamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
