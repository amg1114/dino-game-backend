import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/constants/jwt.constants';

@Module({
  imports: [JwtModule.register(jwtConstants), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
