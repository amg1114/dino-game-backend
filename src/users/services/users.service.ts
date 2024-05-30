import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../../config/constants/bycript.constants';

import { Role } from '../../config/enums/roles.enum';

import { Administrator, Developer, User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { SolicitudDesarrollador } from '../entities/solicitud-desarrollador.entity';
import { CreateSolicitudDesarrolladorDto } from '../dto/create-solicitud-desarrollador.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Developer)
    private readonly developersRepository: Repository<Developer>,
    @InjectRepository(Administrator)
    private readonly administratorsRepository: Repository<Administrator>,
    @InjectRepository(SolicitudDesarrollador)
    private readonly solicitudDesarrolladorRepository: Repository<SolicitudDesarrollador>,
  ) {}

  /**
   * busca un usuario segun el ID recibido por la función
   * @param id ID del usuario a buscar
   * @returns usuario encontrado
   */
  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByCorreo(correo: string) {
    const user = await this.userRepository.findOne({ where: { correo } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * crea un usuario
   * @param userFields campos del usuario a crear
   * @returns usuario creado
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
   * actualiza un usuario segun el ID recibido por la funcion
   * @param id Id del usuario a actualizar
   * @param userFields campos del usuario a actualizar
   * @returns usuario actualizado
   */
  async updateUser(id: number, userFields: UpdateUserDto) {
    if (userFields.password) {
      userFields.password = await bcrypt.hash(userFields.password, SALT_ROUNDS);
    }
    const resultado = await this.userRepository.update(id, userFields);

    if (resultado.affected === 0) {
      throw new HttpException('User could not update', HttpStatus.CONFLICT);
    }

    return resultado;
  }

  /**
   * Elimina un usuario segun el ID recibido por la función
   * @param id ID del usuario a eliminar
   * @returns resultado de la eliminación
   */
  async deleteUser(id: number) {
    const resultado = await this.userRepository.delete(id);

    if (resultado.affected === 0) {
      throw new HttpException('User could not delete', HttpStatus.CONFLICT);
    }

    return resultado;
  }

  /**
   * Retorna el rol de un usuario segun el ID recibido por la función
   * @param id ID del usuario a buscar
   * @returns rol del usuario
   */
  async getRole(id: number): Promise<Role[]> {
    let roles: Role[] = [];

    const isAdmin = await this.administratorsRepository.exists({
      where: { user: { id } },
    });
    const isDeveloper = await this.developersRepository.exists({
      where: { user: { id } },
    });

    if (isAdmin) {
      roles.push(Role.ADMINISTRATOR);
    }

    if (isDeveloper) {
      roles.push(Role.DEVELOPER);
    }

    if (!isAdmin && !isDeveloper) {
      roles = [Role.USER];
    }

    return roles;
  }

  /**
   * Crea una solicitud de desarrollador para un usuario
   * @param id ID del usuario a crear la solicitud
   * @param solicitudFields campos de la solicitud a crear
   * @returns solicitud creada
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
   * Retorna la solicitud de desarrollador de un usuario
   * @param id ID del usuario a buscar la solicitud
   * @returns solicitud encontrada
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
