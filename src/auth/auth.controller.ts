import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Loguea a un usuario
   * @param loginFields Correo y contraseña del usuario
   * @returns Token de acceso
   */
  @Post('login')
  async login(@Body() loginFields: LoginDto) {
    return this.authService.login(loginFields);
  }

  /**
   * Registra a un usuario
   * @param registerFields Campos del usuario a registrar
   * @returns Token de acceso
   */
  @Post('register')
  async register(@Body() registerFields: CreateUserDto) {
    return this.authService.register(registerFields);
  }

  
  /**
   * Obtiene el perfil de un usuario
   * @param req Request
   * @returns Perfil del usuario
   */
  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req: any) {
    return this.authService.profile(req.user.id);
  }

  /**
   * Ruta de prueba de autenticación
   * @returns Mensaje de prueba
   */
  @UseGuards(AuthGuard)
  @Get('test')
  async test() {
    return 'Hello World!';
  }
}
