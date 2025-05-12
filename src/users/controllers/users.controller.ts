import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * crea un usuario basado en los campos recibidos por la funcion
   * @param userFields campos de el usuario a crear
   * @returns usuario creado
   */
  @ApiOperation({
    summary: 'Crear un usuario',
    description:
      'Crea un usuario basado en los campos recibidos por la función',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario fue creado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya existe',
  })
  @Post()
  createUser(@Body() userFields: CreateUserDto) {
    return this.userService.createUser(userFields);
  }

  /**
   * Busca un usuario basado en el id que recibe la función
   * @Param id del usuario a buscar
   * @return usuario encontrado
   */
  @ApiOperation({
    summary: 'Buscar un usuario',
    description: 'Busca un usario basado en el id que recibe la función',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario fue encontrado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'El usuario no fue encontrado',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  /**
   * Actualiza un usuario basado en el ID recibido por la función
   * @param id ID del usuario a actualizar
   * @param userFields campos del usuario a actualizar
   * @returns usuario actualizado
   */
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description:
      ' Actualiza un usuario basado en el ID recibido por la función',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario fue actualizado exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario no fue actualizado correctamente',
  })
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() userFields: UpdateUserDto) {
    return this.userService.updateUser(id, userFields);
  }

  /**
   * Elimina un usuario basado en el ID recibido por la función
   * @param id ID del usuario a eliminar
   * @returns resultado de la eliminacion
   */
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Elimina un usuario basado en el ID',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario fue eliminado exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario no fue eliminado correctamente',
  })
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  /**
   * Busca un usuario basado en el id que recibe la función
   * @Param id del usuario a buscar
   * @return usuario encontrado
   */
  @ApiOperation({
    summary: 'Obtener el rol de un usuario',
    description: 'Retorna un usuario basado en el rol',
  })
  @ApiResponse({
    status: 200,
    //Para revisar
    description: 'Retorna el rol del un usuario',
  })
  @ApiResponse({
    status: 404,
    description: 'El usuario no fue encontrado',
  })
  @Get(':id/role')
  getRole(@Param('id') id: number) {
    return this.userService.getRole(id);
  }
}
