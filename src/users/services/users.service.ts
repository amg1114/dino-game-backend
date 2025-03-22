import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../config/constants/bycript.constants';
import { Role } from '../../config/enums/roles.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SolicitudDesarrollador } from '../entities/solicitud-desarrollador.entity';
import { CreateSolicitudDesarrolladorDto } from '../dto/create-solicitud-desarrollador.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SolicitudDesarrollador)
    private readonly solicitudDesarrolladorRepository: Repository<SolicitudDesarrollador>,
  ) {}

  /**
   * Busca un usuario según el ID recibido por la función.
   * @param id ID del usuario a buscar.
   * @returns Usuario encontrado.
   */
  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param correo Correo electrónico del usuario a buscar.
   * @returns Usuario encontrado.
   */
  async findByCorreo(correo: string) {
    const user = await this.userRepository.findOne({ where: { correo } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * Crea un usuario.
   * @param userFields Campos del usuario a crear.
   * @returns Usuario creado.
   */
  async createUser(userFields: CreateUserDto) {
    userFields.password = bcrypt.hashSync(userFields.password, SALT_ROUNDS);
    const exists = await this.userRepository.findOne({
      where: { correo: userFields.correo },
    });

    if (exists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userRepository.save(userFields);
    return user;
  }

  /**
   * Actualiza un usuario según el ID recibido por la función.
   * @param id ID del usuario a actualizar.
   * @param userFields Campos del usuario a actualizar.
   * @returns Resultado de la actualización.
   */
  async updateUser(id: number, userFields: UpdateUserDto) {
    const resultado = await this.userRepository.update(id, userFields);

    if (resultado.affected === 0) {
      throw new HttpException('User could not update', HttpStatus.CONFLICT);
    }

    return resultado;
  }

  /**
   * Elimina un usuario según el ID recibido por la función.
   * @param id ID del usuario a eliminar.
   * @returns Resultado de la eliminación.
   */
  async deleteUser(id: number) {
    const resultado = await this.userRepository.delete(id);

    if (resultado.affected === 0) {
      throw new HttpException('User could not delete', HttpStatus.CONFLICT);
    }

    return resultado;
  }

  /**
   * Retorna el rol de un usuario según el ID recibido por la función.
   * @param id ID del usuario a buscar.
   * @returns Rol del usuario.
   */
  async getRole(id: number): Promise<Role> {
    const user = await this.findById(id);
    return user.role; // Cambiar 'tipo' por 'role'
  }

  /**
   * Crea una solicitud de desarrollador para un usuario.
   * @param id ID del usuario a crear la solicitud.
   * @param solicitudFields Campos de la solicitud a crear.
   * @returns Solicitud creada.
   */
  async createSolicitudDesarrollador(
    id: number,
    solicitudFields: CreateSolicitudDesarrolladorDto,
  ) {
    const user = await this.findById(id);
    const solicitudExists = await this.solicitudDesarrolladorRepository.findOne(
      {
        where: { user: { id } },
      },
    );

    if (solicitudExists) {
      throw new HttpException('Solicitud already exists', HttpStatus.CONFLICT);
    }

    return this.solicitudDesarrolladorRepository.save({
      ...solicitudFields,
      user,
    });
  }

  /**
   * Retorna la solicitud de desarrollador de un usuario.
   * @param id ID del usuario a buscar la solicitud.
   * @returns Solicitud encontrada.
   */
  async getSolicitudDesarrollador(id: number) {
    const solicitud = await this.solicitudDesarrolladorRepository.findOne({
      where: { user: { id } },
    });

    if (!solicitud) {
      throw new HttpException('Solicitud not found', HttpStatus.NOT_FOUND);
    }

    return solicitud;
  }
}
