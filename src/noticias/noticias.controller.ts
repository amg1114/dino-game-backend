import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Noticias')
@Controller('noticias')
export class NoticiasController {
    constructor(private noticiasService: NoticiasService) {}

    /**
     * Endpoint para obtener todas las noticias
     * @param limit El número de noticias a devolver
     * @returns La lista de noticias
     */
    @Get()
    findAll(@Query('limit') limit = 100){
        return this.noticiasService.findAll(+limit);
    }

    /**
     * Endpoint para obtener una noticia por id
     * @param id El id de la noticia
     * @returns La noticia con el id dado
     */
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.noticiasService.findOne(+id);
    }

    /**
     * Endpoint para crear una nueva noticia
     * @param noticiaFields Los datos para crear una nueva noticia
     * @returns La noticia recién creada
     */
    @Post()
    create(@Body() noticiaFields: CreateNoticiaDto){
        return this.noticiasService.create(noticiaFields);
    }

    /**
     * Endpoint para actualizar una noticia por id
     * @param id El id de la noticia
     * @param noticiaFields Los datos para actualizar la noticia
     * @returns El resultado de la actualización
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() noticiaFields: UpdateNoticiaDto){
        return this.noticiasService.update(+id, noticiaFields);
    }

    /**
     * Endpoint para eliminar una noticia por id
     * @param id El id de la noticia
     * @returns El resultado de la eliminación
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.noticiasService.remove(+id);
    }

}
