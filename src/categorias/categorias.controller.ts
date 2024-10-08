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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  /**
   * EndPoint para obtener la lista de todas las categorias
   * @returns {Promise<Categoria[]>}
   */
  @Get()
  getAll(@Query() queries: CategoriaQueries): Promise<Categoria[]> {
    return this.categoriasService.findCategorias(queries);
  }

  /**
   * EndPoint para obtener una categoria por el parámetro ID
   * @param id ID de la categoria a buscar
   * @returns {Promise<Categoria>}
   */
  @Get(':id')
  getOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriasService.findCategoriaById(id);
  }

  /**
   * EndPoint para crear una Categoria
   * @param categoriaFields Campos de la categoria a crear
   * @returns {Promise<Categoria>}
   */
  @Post()
  create(@Body() categoriaFields: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.createCategoria(categoriaFields);
  }

  /**
   * EndPoint para actualizar una categoria
   * @param id ID de la categoria a actualizar
   * @param categoriaFields Campos de la Categoria a actualizar
   * @returns {Promise<UpdateResult>}
   */
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
   * @returns {Promise<DeleteResult>}
   */
  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoriasService.deleteCategoria(id);
  }
}
