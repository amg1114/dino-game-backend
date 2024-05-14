import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Importaciones propias
import { Role } from 'src/config/enums/roles.enum';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { CreateDescuentoDto } from '../dto/descuentos/create-descuento.dto';
import { UpdateDescuentoDto } from '../dto/descuentos/update-descuento.dto';
import { DescuentosService } from '../services/descuentos.service';

@ApiTags('Descuentos')
@Controller('video-games/:videogame/descuentos')
@UseGuards(AuthGuard, RolesGuard)
export class DescuentosController {
    constructor(private readonly descuentosService: DescuentosService) { }

    /**
     * Busca los descuentos activos de un videojuego
     * @param videogame ID del videojuego
     * @returns Descuentos del videojuego
     */
    @Get()
    @Public()
    getDescuentos(@Param('videogame') videogame: number){
        return this.descuentosService.getDescuentosByVideoGame(videogame);
    }

    /**
     * Agrega un descuento a un videojuego
     * @param id ID del videojuego
     * @param descuentoFields campos del Descuento a agregar
     */
    @Post()
    @Roles(Role.ADMINISTRATOR)
    createDescuento(@Param('videogame') videogame: number, @Body() descuentoFields: CreateDescuentoDto) {
        return this.descuentosService.addDescuentoToVideoGame(videogame, descuentoFields);
    }

    /**
     * Actualiza un descuento de un videojuego
     * @param descuento ID del Descuento a actualizar
     * @param descuentoFields Campos del Descuento a actualizar
     * @returns Resultado de la actualización
     */
    @Patch(':descuento')
    @Roles(Role.ADMINISTRATOR)
    updateDescuento(@Param('descuento') descuento: number, @Body() descuentoFields: UpdateDescuentoDto) {
        return this.descuentosService.updateDescuentoToVideoGame(descuento, descuentoFields);
    }

    /**
     * Elimina un descuento de un videojuego
     * @param descuento ID del Descuento a eliminar
     * @returns Resultado de la eliminación
     */
    @Delete(':descuento')
    @Roles(Role.ADMINISTRATOR)
    deleteDescuento(@Param('descuento') descuento: number) {
        return this.descuentosService.deleteDescuento(descuento);
    }
}
