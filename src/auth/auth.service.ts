import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly JwtService: JwtService,
  ) {}

  async login({ correo, password }: LoginDto) {
    const user = await this.usersService.findByCorreo(correo);

    if ((await bcrypt.compare(password, user.password)) === false) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = {
      sub: user.id,
      correo: user.correo,
      role: await this.usersService.getRole(user.id),
    };

    return {
      access_token: await this.JwtService.signAsync(payload),
    };
  }

  async register(userFields: CreateUserDto) {
    const login: LoginDto = {
      correo: userFields.correo,
      password: userFields.password,
    };
    const user = await this.usersService.createUser(userFields);
    
    if (!user) {
      throw new HttpException(
        'User not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    console.log('Created user to login', user);

    return this.login(login);
  }
}
