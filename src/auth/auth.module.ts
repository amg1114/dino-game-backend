import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/constants/jwt.constants';
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
        dir: path.resolve(process.cwd(), 'src', 'auth', 'templates'), // Cambiar a process.cwd() para desarrollo
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
