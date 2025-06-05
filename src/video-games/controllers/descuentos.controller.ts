import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Importaciones propias
import { Role } from '../../config/enums/roles.enum';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';

import { CreateDescuentoDto } from '../dto/descuentos/create-descuento.dto';
import { UpdateDescuentoDto } from '../dto/descuentos/update-descuento.dto';
import { DescuentosService } from '../services/descuentos.service';

@ApiTags('Descuentos')
@Controller('video-games/:videogame/descuentos')
@UseGuards(AuthGuard, RolesGuard)
export class DescuentosController {
  constructor(private readonly descuentosService: DescuentosService) {}

  /**
   * Busca los descuentos activos de un videojuego
   * @param videogame ID del videojuego
   * @returns Descuentos del videojuego
   */
  @ApiOperation({
    summary: 'Obtener descuentos activos de un videojuego',
    description:
      'Obtiene una lista con los descuentos activos de un videojuego',
  })
  @ApiResponse({
    status: 200,
    description: 'Los descuentos fueron encontrados exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Los descuentos no fueron encontrados',
  })
  @Get()
  @Public()
  getDescuentos(@Param('videogame') videogame: string) {
    return this.descuentosService.getDescuentosByVideoGame(videogame);
  }

  /**
   * Agrega un descuento a un videojuego
   * @param id ID del videojuego
   * @param descuentoFields campos del Descuento a agregar
   */
  @ApiOperation({
    summary: 'Agregar un descuento a un videojuego',
    description: 'Agrega un descuento a un videojuego',
  })
  @ApiResponse({
    status: 200,
    description: 'Los descuentos fueron encontrados exitosamente',
  })
  @Post()
  @Roles(Role.DEVELOPER)
  createDescuento(
    @Param('videogame') videogame: string,
    @Body() descuentoFields: CreateDescuentoDto,
  ) {
    return this.descuentosService.addDescuentoToVideoGame(
      videogame,
      descuentoFields,
    );
  }

  /**
   * Actualiza un descuento de un videojuego
   * @param descuento ID del Descuento a actualizar
   * @param descuentoFields Campos del Descuento a actualizar
   * @returns Resultado de la actualización
   */
  @ApiOperation({
    summary: 'Actualizar el descuento de un videojuego',
    description: 'Actualiza los descuentos activos de un videojuego',
  })
  @ApiResponse({
    status: 200,
    description: 'Los descuentos fueron encontrados exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Los descuentos no fueron encontrados',
  })
  @Patch(':descuento')
  @Roles(Role.DEVELOPER)
  updateDescuento(
    @Param('descuento') descuento: number,
    @Body() descuentoFields: UpdateDescuentoDto,
  ) {
    return this.descuentosService.updateDescuentoToVideoGame(
      descuento,
      descuentoFields,
    );
  }

  /**
   * Elimina un descuento de un videojuego
   * @param descuento ID del Descuento a eliminar
   * @returns Resultado de la eliminación
   */
  @ApiOperation({
    summary: 'Eliminar el descuento de un videojuego',
    description: 'Elimina un descuento activo de un videojuego',
  })
  @ApiResponse({
    status: 200,
    description: 'El descuento fue eliminados exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El descuento no fue eliminado correctamente',
  })
  @Delete(':descuento')
  @Roles(Role.DEVELOPER)
  deleteDescuento(@Param('descuento') descuento: number) {
    return this.descuentosService.deleteDescuento(descuento);
  }
}
