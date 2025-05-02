import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Loguea a un usuario
   * @param correo Correo del usuario
   * @param password Contraseña del usuario
   * @returns Token de acceso
   */
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
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * Crea un usuario y lo loguea
   * @param userFields Campos del usuario a crear
   * @returns Token de acceso
   */
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

    return this.login(login);
  }

  /**
   * Obtiene los campos de un usuario
   * @param id ID del usuario
   * @returns Campos del usuario
   */
  async profile(id: number) {
    const user = await this.usersService.findById(id);
    const role = await this.usersService.getRole(id);
    return { ...user, role };
  }

  /**
   * Envía un correo electrónico para restablecer la contraseña al usuario con el correo especificado.
   * Si el usuario no es encontrado, devuelve un mensaje indicando que no se encontró el usuario.
   *
   * @param email - Dirección de correo del usuario que solicita el restablecimiento de contraseña.
   * @returns Un objeto con un mensaje indicando el resultado de la operación.
   */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByCorreo(email);
    if (!user) {
      return { message: 'Usuario no encontrado' };
    }

    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    const resetUrl = `${process.env.FRONTEND_URL}/recuperar-contrasena/${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'DINOGAME - Recuperación de Contraseña',
        template: './reset-password',
        context: {
          name: user.nombre,
          resetUrl,
          logoUrl: 'cid:logo',
        },
        attachments: [
          {
            filename: 'logo.png',
            path: path.join(process.cwd(), 'src', 'auth', 'assets', 'logo.png'),
            cid: 'logo',
          },
        ],
      });
      return { message: `Correo enviado al email ${email}` };
    } catch (error) {
      throw new HttpException(
        'Error al enviar el correo de recuperación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Restablece la contraseña de un usuario utilizando un token de autenticación y retorna el resultado del login.
   *
   * @param token - El token JWT que contiene la información del usuario.
   * @param newPassword - La nueva contraseña que se asignará al usuario.
   * @returns Un objeto con el token de acceso del usuario autenticado.
   * @throws HttpException si el usuario no es encontrado o si el token es inválido o ha expirado.
   */
  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      await this.usersService.updatePassword(payload.sub, newPassword);
      return this.login({
        correo: user.correo,
        password: newPassword,
      });
    } catch (error) {
      throw new HttpException(
        'Token inválido o expirado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Cambia la contraseña de un usuario después de verificar que la contraseña actual sea correcta.
   *
   * @param userId - El ID del usuario que solicita el cambio de contraseña.
   * @param currentPassword - La contraseña actual del usuario para verificar su identidad.
   * @param newPassword - La nueva contraseña que se establecerá para el usuario.
   * @returns Un objeto con un mensaje indicando el resultado de la operación.
   * @throws HttpException - Si la contraseña actual proporcionada no coincide con la almacenada.
   */
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Contraseña actual incorrecta',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.usersService.updatePassword(userId, newPassword);
      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw new HttpException(
        'Error al actualizar la contraseña',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
