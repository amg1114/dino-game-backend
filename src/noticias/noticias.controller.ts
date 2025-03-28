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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../config/enums/roles.enum';
import { Noticia } from './noticia.entity';
import {
  NoticiaFoundResponseDto,
  NoticiaNotFoundResponseDto,
  NoticiasNotFoundResponseDto,
} from './dto/responses-dto';
import {
  DeleteResultResponseDto,
  UpdateResultResponseDto,
} from 'src/config/responses-dto';
import { QueriesNoticesDto } from './dto/queries-notices.dto';

@ApiTags('Noticias')
@Controller('noticias')
@UseGuards(AuthGuard, RolesGuard)
export class NoticiasController {
  constructor(private noticiasService: NoticiasService) {}

  /**
   
   * @method findAll
   * @description Obtiene todas las noticias de la base de datos.
   * @param {QueriesNoticesDto} queries - Parámetros de consulta para filtrar y ordenar las noticias.
   * @returns {Promise<Noticia[]>} Lista de noticias.
   */
  @Get()
  @Public()
  @ApiOperation({
    summary: 'Obtener todas las noticias',
    description: 'Obtiene todas las noticias en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de noticias',
    type: NoticiaFoundResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid order value. Allowed values are ASC or DESC.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid orderBy value. Allowed values are titulo or fecha.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron noticias',
    type: NoticiasNotFoundResponseDto,
  })
  findAll(@Query() queries: QueriesNoticesDto) {
    return this.noticiasService.findAll(queries);
  }

  /**
   * Endpoint para crear una nueva noticia
   * @param noticiaFields Los datos para crear una nueva noticia
   * @returns La noticia recién creada
   */
  @ApiOperation({
    summary: 'Crear una noticia',
    description: 'Crea una nueva noticia',
  })
  @ApiResponse({
    status: 200,
    description: 'La noticia fue creada exitosamente',
    type: Noticia,
  })
  @Post()
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  create(@Body() noticiaFields: CreateNoticiaDto, @Request() req: any) {
    const autor = req.user;
    return this.noticiasService.create(autor.id, noticiaFields);
  }

  /**
   * Endpoint para obtener una noticia por id
   * @param id El id de la noticia
   * @returns La noticia con el id dado
   */
  @ApiOperation({
    summary: 'Obtener una noticia',
    description: 'Obtiene una noticia basado en el id de la noticia',
  })
  @ApiResponse({
    status: 200,
    description: 'La noticia fue encontrada exitosamente',
    type: Noticia,
  })
  @ApiResponse({
    status: 404,
    description: 'La noticia no fue encontrada',
    type: NoticiaNotFoundResponseDto,
  })
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.noticiasService.findOne(+id);
  }

  /**
   * Endpoint para actualizar una noticia por id
   * @param id El id de la noticia
   * @param noticiaFields Los datos para actualizar la noticia
   * @returns El resultado de la actualización
   */
  @ApiOperation({
    summary: 'Actualizar una noticia',
    description: 'Actualiza una noticia en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Noticia actualizada',
    //Para revisar
    type: UpdateResultResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro la noticia',
    type: NoticiaNotFoundResponseDto,
  })
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
  @ApiOperation({
    summary: 'Eliminar una noticia',
    description: 'Elimina una noticia en la base de datos',
  })
  @ApiResponse({
    status: 200,
    description: 'Noticia eliminada',
    type: DeleteResultResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro la noticia',
    type: NoticiaNotFoundResponseDto,
  })
  @Delete(':id')
  @Roles(Role.ADMINISTRATOR, Role.DEVELOPER)
  remove(@Param('id') id: string) {
    return this.noticiasService.remove(+id);
  }
}
