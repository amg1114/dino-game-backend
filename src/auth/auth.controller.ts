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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  InternalServerErrorResponseDto,
  UnauthorizedResponseDto,
} from './dto/responses-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Loguea a un usuario
   * @param loginFields Correo y contraseña del usuario
   * @returns Token de acceso
   */
  @ApiOperation({
    summary: 'Loguear un usuario',
    description: 'Loguea un usuario',
  })
  //Para revisar
  @ApiResponse({
    status: 200,
    description: 'Logueo completado exitosamente',
    type: LoginDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales invalidas',
    type: UnauthorizedResponseDto,
  })
  @Post('login')
  async login(@Body() loginFields: LoginDto) {
    return this.authService.login(loginFields);
  }

  /**
   * Registra a un usuario
   * @param registerFields Campos del usuario a registrar
   * @returns Token de acceso
   */
  @ApiOperation({
    summary: 'Registrar un usuario',
    description: 'Registra un usuario en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario fue registrado exitosamente',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 500,
    description: 'EL usuario no fue creado',
    type: InternalServerErrorResponseDto,
  })
  @Post('register')
  async register(@Body() registerFields: CreateUserDto) {
    return this.authService.register(registerFields);
  }

  /**
   * Obtiene el perfil de un usuario
   * @param req Request
   * @returns Perfil del usuario
   */
  @ApiOperation({
    summary: 'Obtener el perfil de un usuario',
    description: 'obtiene el perdil de un usuario',
  })
  //Para revisar
  @ApiResponse({
    status: 200,
    description: 'El perfil fue encontrado exitosamente',
    type: User,
  })
  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req: any) {
    return this.authService.profile(req.user.id);
  }
}
