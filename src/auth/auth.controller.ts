import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  Req,
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
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

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

  /**
   * Solicita el restablecimiento de contraseña para un usuario.
   * @param email Correo del usuario que solicita el restablecimiento.
   * @returns Mensaje indicando el resultado de la operación.
   */
  @ApiOperation({
    summary: 'Solicitar restablecimiento de contraseña',
    description:
      'Envía un correo con un enlace para restablecer la contraseña.',
  })
  @ApiResponse({
    status: 200,
    description: 'Correo enviado exitosamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al enviar el correo de recuperación.',
  })
  @Post('request-password-reset')
  async requestPasswordReset(@Query('email') email: string) {
    return await this.authService.requestPasswordReset(email);
  }

  /**
   * Restablece la contraseña de un usuario utilizando un token.
   * @param body Contiene el token y la nueva contraseña.
   * @returns Mensaje indicando el resultado de la operación.
   */
  @ApiOperation({
    summary: 'Restablecer contraseña',
    description: 'Permite restablecer la contraseña utilizando un token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Contraseña restablecida correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Token inválido o expirado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return await this.authService.resetPassword(body.token, body.newPassword);
  }

  /**
   * Cambia la contraseña de un usuario autenticado.
   * @param req Request con la información del usuario autenticado.
   * @param body Contiene la contraseña actual y la nueva contraseña.
   * @returns Mensaje indicando el resultado de la operación.
   */
  @ApiOperation({
    summary: 'Cambiar contraseña',
    description: 'Permite a un usuario autenticado cambiar su contraseña.',
  })
  @ApiResponse({
    status: 200,
    description: 'Contraseña actualizada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Contraseña actual incorrecta.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al actualizar la contraseña.',
  })
  @Post('change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Req() req,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return await this.authService.changePassword(
      req.user.id,
      body.currentPassword,
      body.newPassword,
    );
  }
}
