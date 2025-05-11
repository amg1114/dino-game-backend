import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './categoria.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CategoriaQueries } from './dto/categoria-queries.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  /**
   * EndPoint para obtener la lista de todas las categorias
   * @returns {Promise<Categoria[]>} lista de todas las categorias
   */
  @ApiOperation({
    summary: 'Obtener lista de todas las categorias',
    description: 'Obtiene la lista de todas las categorias de los videojuegos',
  })
  @ApiResponse({
    status: 200,
    description: 'Las categorias fueron encontradas exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categorias no encontradas',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid limit value',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid offset value',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid order value',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid title value',
  })
  @Get()
  getAll(@Query() queries: CategoriaQueries) {
    return this.categoriasService.findCategorias(queries);
  }

  /**
   * EndPoint para obtener una categoria por el parámetro ID
   * @param id ID de la categoria a buscar
   * @returns {Promise<Categoria>} categoria buscada
   */
  @ApiOperation({
    summary: 'Obtener una categoria',
    description: 'Obtiene una categoria de videojuegos',
  })
  @ApiResponse({
    status: 200,
    description: 'La categoria fue encontrada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria no encontrada',
  })
  @Get(':id')
  getOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriasService.findCategoriaById(id);
  }

  /**
   * EndPoint para crear una Categoria
   * @param categoriaFields Campos de la categoria a crear
   * @returns {Promise<Categoria>} categoria creada
   */
  @ApiOperation({
    summary: 'Crear una categoria',
    description: 'Crea una nueva categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'La categoria fue creada exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'La categoria existe actualmente',
  })
  @Post()
  create(@Body() categoriaFields: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.createCategoria(categoriaFields);
  }

  /**
   * EndPoint para actualizar una categoria
   * @param id ID de la categoria a actualizar
   * @param categoriaFields Campos de la Categoria a actualizar
   * @returns {Promise<UpdateResult>} categoria actualizada
   */
  @ApiOperation({
    summary: 'Actualizar una categoria',
    description: 'Actualiza la categoria de un videojuego',
  })
  //Para revisar
  @ApiResponse({
    status: 200,
    description: 'La categoria fue actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria no encontrada',
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() categoriaFields: UpdateCategoriaDto,
  ): Promise<UpdateResult> {
    return this.categoriasService.updateCategoria(id, categoriaFields);
  }

  /**
   * EndPoint para eliminar una categoria
   * @param id ID de la categoria a eliminar
   * @returns {Promise<DeleteResult>} categoria eliminada
   */
  @ApiOperation({
    summary: 'Eliminar una categoria',
    description: 'Elimina la categoria de un videojuego',
  })
  //Para revisar
  @ApiResponse({
    status: 200,
    description: 'La categoria fue eliminada exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'Categoria no eliminada correctamente',
  })
  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoriasService.deleteCategoria(id);
  }
}
