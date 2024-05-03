import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Busca un usuario basado en el id que recibe la función
   * @Param id del usuario a buscar
   * @return usuario encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  /**
   * Busca un usuario basado en el id que recibe la función
   * @Param id del usuario a buscar
   * @return usuario encontrado
   */
  @Get(':id/role')
  getRole(@Param('id') id: number) {
    return this.userService.getRole(id);
  }

  /**
   * crea un usuario basado en los campos recibidos por la funcion
   * @param userFields campos de el usuario a crear
   * @returns usuario creado
   */
  @Post()
  createUser(@Body() userFields: CreateUserDto) {
    return this.userService.createUser(userFields);
  }

  /**
   * Actualiza un usuario basado en el ID recibido por la función
   * @param id ID del usuario a actualizar
   * @param userFields campos del usuario a actualizar
   * @returns usuario actualizado
   */
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() userFields: UpdateUserDto) {
    return this.userService.updateUser(id, userFields);
  }

  /**
   * Elimina un usuario basado en el ID recibido por la función
   * @param id ID del usuario a eliminar
   * @returns resultado de la eliminacion
   */
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
