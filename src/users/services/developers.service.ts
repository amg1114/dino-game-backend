import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { SolicitudDesarrollador } from '../entities/solicitud-desarrollador.entity';

import { UsersService } from '../services/users.service';

import { CreateSolicitudDesarrolladorDto } from '../dto/create-solicitud-desarrollador.dto';
import { UpdateSolicitudDesarrolladorDto } from '../dto/update-solicitud-desarrollador.dto';
import { Role } from '../../config/enums/roles.enum';
import { User } from '../entities/user.entity';
import { SolicitudDesarrolladorQueries } from '../dto/solicitudDesarrollador-queries.dto';
import { PaginatedDataResponse } from 'src/config/models/paginatedData-response.interface';
import { DesarrolladorQueries } from '../dto/desarrollador-queries.dto';
import { VideoGame } from 'src/video-games/entities/video-game.entity';
import { State } from 'src/config/enums/state';

@Injectable()
export class DevelopersService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SolicitudDesarrollador)
    private readonly solicitudDesarrolladorRepository: Repository<SolicitudDesarrollador>,
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,
  ) {}

  /**
   * Obtiene todas las solicitudes
   * @returns {Promise <SolicitudDesarrollador[]> } Lista de solicitudes
   */
  async getSolicitudes(
    urlQueries: SolicitudDesarrolladorQueries,
  ): Promise<PaginatedDataResponse<SolicitudDesarrollador>> {
    const { limit = null, offset = 0, order = 'ASC', ...queries } = urlQueries;

    let queryBuilder =
      this.solicitudDesarrolladorRepository.createQueryBuilder('solicitud');
    queryBuilder.leftJoinAndSelect('solicitud.user', 'user');

    if (queries.search) {
      queryBuilder
        .where('solicitud.titulo ILIKE :search', {
          search: `%${queries.search}%`,
        })
        .orWhere('solicitud.mensaje ILIKE :search', {
          search: `%${queries.search}%`,
        });
    }

    if (limit !== null && limit <= 0) {
      throw new HttpException('Invalid limit value', HttpStatus.BAD_REQUEST);
    }

    if (offset < 0) {
      throw new HttpException('Invalid offset value', HttpStatus.BAD_REQUEST);
    }

    if (order !== 'ASC' && order !== 'DESC') {
      throw new HttpException('Invalid order value', HttpStatus.BAD_REQUEST);
    }

    if (limit !== null) {
      queryBuilder.take(limit).skip(offset * limit);
    }

    if (!queries.orderBy) {
      queryBuilder = queryBuilder.addOrderBy(
        'solicitud.titulo',
        order || 'ASC',
      );
    } else if (queries.orderBy === 'fecha') {
      queryBuilder = queryBuilder.addOrderBy(
        'solicitud.createdAt',
        order || 'ASC',
      );
    } else {
      queryBuilder = queryBuilder.addOrderBy(
        `solicitud.${queries.orderBy}`,
        order || 'ASC',
      );
    }

    return {
      data: await queryBuilder.getMany(),
      offset,
      total: await queryBuilder.getCount(),
    };
  }

  /**
   * Obtiene la solicitud de un usuario
   * @param user ID del usuario a buscar
   * @returns Solicitud del usuario
   */
  async getSolicitud(user: number): Promise<SolicitudDesarrollador> {
    const solicitud = await this.solicitudDesarrolladorRepository.findOne({
      where: {
        user: { id: user },
      },
    });

    if (!solicitud) {
      throw new HttpException('Solicitud no encontrada', HttpStatus.NOT_FOUND);
    }

    return solicitud;
  }

  /**
   * Crea una solicitud para obtener el rol de desarrollador
   * @param user_id ID del usuario que crea la solicitud
   * @param solicitudFields Campos de la solicitud a crear
   * @returns Solicitud creada
   */
  async createSolicitud(
    user_id: number,
    solicitudFields: CreateSolicitudDesarrolladorDto,
  ): Promise<SolicitudDesarrollador> {
    const user = await this.userService.findById(user_id);
    const exists = await this.solicitudDesarrolladorRepository.exists({
      where: {
        user,
      },
    });

    if (exists) {
      throw new HttpException(
        'Ya existe una solicitud',
        HttpStatus.BAD_REQUEST,
      );
    }

    const solicitud =
      this.solicitudDesarrolladorRepository.create(solicitudFields);
    solicitud.user = user;

    return this.solicitudDesarrolladorRepository.save(solicitud);
  }

  /**
   * Actualiza una solicitud
   * @param id ID de la solicitud a actualizar
   * @param solicitudFields Campos de la solicitud a actualizar
   * @returns Resultado de la actualización
   */
  async updateSolicitud(
    user: number,
    solicitudFields: UpdateSolicitudDesarrolladorDto,
  ): Promise<UpdateResult> {
    const solicitud = await this.solicitudDesarrolladorRepository.findOne({
      where: {
        user: { id: user },
      },
      relations: ['user'],
    });

    if (!solicitud) {
      throw new HttpException('Solicitud no encontrada', HttpStatus.NOT_FOUND);
    }

    const resultado = await this.solicitudDesarrolladorRepository.update(
      solicitud.id,
      solicitudFields,
    );

    if (resultado.affected === 0) {
      throw new HttpException('Solicitud no actualizada', HttpStatus.CONFLICT);
    }

    if (solicitudFields.estado === State.APPROVED) {
      await this.createDeveloper(solicitud.user.id);
    }

    return resultado;
  }

  /**
   * Crear un desarrollador
   * @param user_id El id del usuario
   * @returns {Promise<Developer>} Desarrollador creado
   */
  async createDeveloper(user_id: number): Promise<any> {
    const tipo = { tipo: Role.DEVELOPER };
    return this.userService.updateUser(user_id, tipo);
  }

  /**
   * Eliminar un desarrollador
   * @param id El id del desarrollador
   * @returns {Promise<DeleteResult>} Resultado de la eliminación
   */
  async deleteDeveloper(id: number): Promise<DeleteResult> {
    const developer = await this.userService.findById(id);

    if (!developer) {
      throw new HttpException(
        'Desarrollador no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const resultado = await this.userService.deleteUser(developer.id);

    if (resultado.affected === 0) {
      throw new HttpException(
        'Desarrollador no eliminado',
        HttpStatus.CONFLICT,
      );
    }
    return resultado;
  }

  /**
   * Obtener lista de desarrolladores
   * @returns Lista de desarrolladores
   */
  async getDevelopers(
    urlQueries: DesarrolladorQueries,
  ): Promise<PaginatedDataResponse<User>> {
    const { limit = null, offset = 0, order = 'ASC', ...queries } = urlQueries;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userDevelopedVideoGames', 'videoGame')
      .where('user.tipo = :tipo', { tipo: Role.DEVELOPER });

    if (queries.search) {
      queryBuilder.andWhere('user.nombre ILIKE :search', {
        search: `%${queries.search}%`,
      });
    }

    if (limit !== null && limit <= 0) {
      throw new HttpException('Invalid limit value', HttpStatus.BAD_REQUEST);
    }

    if (offset < 0) {
      throw new HttpException('Invalid offset value', HttpStatus.BAD_REQUEST);
    }

    if (order !== 'ASC' && order !== 'DESC') {
      throw new HttpException('Invalid order value', HttpStatus.BAD_REQUEST);
    }

    if (limit !== null) {
      queryBuilder.take(limit).skip(offset * limit);
    }

    queryBuilder.addOrderBy('user.nombre', order);

    const developers = await queryBuilder.getMany();

    const total = await queryBuilder.getCount();

    const developersWithVideoGames = developers.map((developer) => ({
      ...developer,
      videoGames: developer.userDevelopedVideoGames || [],
    }));

    return {
      data: developersWithVideoGames,
      offset,
      total,
    };
  }

  /**
   * Buscar un desarrollador por su id
   * @param id Id del desarrollador
   * @returns Desarrollador encontrado
   */
  async getDeveloperById(id: number): Promise<User> {
    const developer = await this.userRepository.findOne({
      where: { id, tipo: Role.DEVELOPER },
    });

    if (!developer)
      throw new HttpException(
        'Desarrollador no encontrado',
        HttpStatus.NOT_FOUND,
      );

    return developer;
  }
}
