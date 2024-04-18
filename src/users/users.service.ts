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

    async findById(id: number){
        const user = await this.userRepository.findOneBy({id})
        
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async createUser(userFields: CreateUserDto){
        const user = await this.userRepository.save(userFields)

        return user
    }

    async updateUser(id:number, userFields: UpdateUserDto){
        const resultado = await this.userRepository.update(id, userFields)

        if(resultado.affected === 0){
            throw new HttpException('User could not update', HttpStatus.CONFLICT)
        }

        return resultado
    }

    async deleteUser(id:number){
        const resultado = await this.userRepository.delete(id)

        if(resultado.affected === 0){
            throw new HttpException('User could not delete', HttpStatus.CONFLICT)
        }
        
        return resultado
    }

}
