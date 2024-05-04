import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator, Developer, User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt";
import { SALT_ROUNDS } from 'src/config/constants/bycript.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Developer)
    private readonly developersRepository: Repository<Developer>,
    @InjectRepository(Administrator)
    private readonly administratorsRepository: Repository<Administrator>,
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
    const user = await this.userRepository.findOne({ where:{ correo } });

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

  async getRole(id: number) {
    const user = await this.findById(id);
    if (user) {
      

      const isDeveloper = await this.developersRepository.exists({
        where: { id },
      });

      if (isDeveloper) {
        return 'DEVELOPER';
      }

      const isAdmin = await this.administratorsRepository.exists({
        where: { id },
      });

      if (isAdmin) {
        return 'ADMINISTRATOR';
      }

      return 'USER';
    }
  }
}
