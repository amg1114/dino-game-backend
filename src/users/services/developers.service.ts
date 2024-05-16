import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { EstadoSolicitud,  SolicitudDesarrollador } from '../entities/solicitud-desarrollador.entity';
import { Developer, Administrator } from '../entities/user.entity';

import { UsersService } from '../services/users.service';

import { CreateSolicitudDesarrolladorDto } from '../dto/create-solicitud-desarrollador.dto';
import { UpdateSolicitudDesarrolladorDto } from '../dto/update-solicitud-desarrollador.dto';

@Injectable()
export class DevelopersService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Developer)
    private readonly developersRepository: Repository<Developer>,
    @InjectRepository(Administrator)
    private readonly administratorsRepository: Repository<Administrator>,
    @InjectRepository(SolicitudDesarrollador)
    private readonly solicitudDesarrolladorRepository: Repository<SolicitudDesarrollador>,
  ) {}

  /**
   * Obtiene todas las solicitudes
   * @returns {Promise <SolicitudDesarrollador[]> } Lista de solicitudes
   */
  async getSolicitudes(): Promise<SolicitudDesarrollador[]> {
    return this.solicitudDesarrolladorRepository.find({
      order: {
        estado: 'ASC',
      },
    });
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

    const resultado = await this.solicitudDesarrolladorRepository.update(
      solicitud.id,
      solicitudFields,
    );

    if (resultado.affected === 0) {
      throw new HttpException('Solicitud no actualizada', HttpStatus.CONFLICT);
    }

    if (solicitudFields.estado === EstadoSolicitud.Aceptada) {
      await this.createDeveloper(solicitud.user.id);
    }

    return resultado;
  }

  /**
   * Crear un desarrollador
   * @param user_id El id del usuario
   * @returns {Promise<Developer>} Desarrollador creado
   */
  async createDeveloper(user_id: number): Promise<Developer> {
    console.log('Create developer', user_id);
    const user = await this.userService.findById(user_id);
    return this.developersRepository.save({ user });
  }

  /**
   * Eliminar un desarrollador
   * @param id El id del desarrollador
   * @returns {Promise<DeleteResult>} Resultado de la eliminación
   */
  async deleteDeveloper(id: number): Promise<DeleteResult> {
    const developer = await this.developersRepository.findOne({
      where: { user: { id } },
    });

    if (!developer) {
      throw new HttpException(
        'Desarrollador no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const resultado = await this.developersRepository.delete(developer.id);

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
  async getDevelopers(): Promise<Developer[]> {
    const developers = await this.developersRepository.find();

    if (!developers)
      throw new HttpException(
        'No se encontraron desarrolladores',
        HttpStatus.NOT_FOUND,
      );

    return developers;
  }
}
