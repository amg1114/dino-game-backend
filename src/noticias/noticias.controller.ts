import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../config/enums/roles.enum';

@ApiTags('Noticias')
@Controller('noticias')
@UseGuards(AuthGuard, RolesGuard)
export class NoticiasController {
  constructor(private noticiasService: NoticiasService) {}

  /**
   * Endpoint para obtener todas las noticias
   * @param limit El número de noticias a devolver
   * @returns La lista de noticias
   */
  @Get()
  @Public()
  findAll(@Query('limit') limit = 100) {
    return this.noticiasService.findAll(+limit);
  }

  /**
   * Endpoint para obtener una noticia por id
   * @param id El id de la noticia
   * @returns La noticia con el id dado
   */
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.noticiasService.findOne(+id);
  }

  /**
   * Endpoint para crear una nueva noticia
   * @param noticiaFields Los datos para crear una nueva noticia
   * @returns La noticia recién creada
   */
  @Post()
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  create(
    @Body() noticiaFields: CreateNoticiaDto,
    @Request() req: any,
  ) {
    const autor = req.user;
    return this.noticiasService.create(autor.id, noticiaFields);
  }

  /**
   * Endpoint para actualizar una noticia por id
   * @param id El id de la noticia
   * @param noticiaFields Los datos para actualizar la noticia
   * @returns El resultado de la actualización
   */
  @Patch(':id')
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  update(@Param('id') id: string, @Body() noticiaFields: UpdateNoticiaDto) {
    return this.noticiasService.update(+id, noticiaFields);
  }

  /**
   * Endpoint para eliminar una noticia por id
   * @param id El id de la noticia
   * @returns El resultado de la eliminación
   */
  @Delete(':id')
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  remove(@Param('id') id: string) {
    return this.noticiasService.remove(+id);
  }
}
