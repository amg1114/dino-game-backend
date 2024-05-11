import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants/jwt.constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user = this.usersService.findByCorreo(decoded.correo);
      request.user = user;
      
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorizeddd', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
