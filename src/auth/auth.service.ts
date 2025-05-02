import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { VideoGamesService } from 'src/video-games/services/video-games.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Calificacion } from 'src/video-games/entities/calificacion.entity';
import { Like } from 'src/noticias/entities/like.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Calificacion)
    private readonly calficacionRepository: Repository<Calificacion>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly videoGameService: VideoGamesService,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersService.findById(id);
    const role = await this.usersService.getRole(id);
    const videogames = await this.videoGameService.findUserVideoGames(id);

    const calificacion = await this.calficacionRepository
      .createQueryBuilder('calificacion')
      .leftJoin('calificacion.user', 'user')
      .leftJoin('calificacion.videoGame', 'videoGame')
      .where('user_id = :id', { id })
      .select(['video_game_id AS "videoGameID"', 'puntaje AS calificacion'])
      .getRawMany();

    const likes = await this.likesRepository
      .createQueryBuilder('likes')
      .leftJoin('likes.user', 'user')
      .leftJoin('likes.noticia', 'noticia')
      .where('likes.user_id = :id', { id })
      .select('likes.noticia_id AS "noticiaID"')
      .getRawMany();

    return { ...user, role, videogames, calificacion, likes };
  }
}
