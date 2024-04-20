import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    /**
     * busca un usuario segun el ID recibido por la función
     * @param id ID del usuario a buscar
     * @returns usuario encontrado 
     */
    async findById(id: number){
        const user = await this.userRepository.findOneBy({id})
        
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user
    }

    /**
     * crea un usuario
     * @param userFields campos del usuario a crear
     * @returns usuario creado
     */
    async createUser(userFields: CreateUserDto){
        const user = await this.userRepository.save(userFields)

        return user
    }

    /**
     * actualiza un usuario segun el ID recibido por la funcion
     * @param id Id del usuario a actualizar
     * @param userFields campos del usuario a actualizar
     * @returns usuario actualizado
     */
    async updateUser(id:number, userFields: UpdateUserDto){
        const resultado = await this.userRepository.update(id, userFields)

        if(resultado.affected === 0){
            throw new HttpException('User could not update', HttpStatus.CONFLICT)
        }

        return resultado
    }

    /**
     * Elimina un usuario segun el ID recibido por la función
     * @param id ID del usuario a eliminar
     * @returns resultado de la eliminación 
     */
    async deleteUser(id:number){
        const resultado = await this.userRepository.delete(id)

        if(resultado.affected === 0){
            throw new HttpException('User could not delete', HttpStatus.CONFLICT)
        }
        
        return resultado
    }

}
