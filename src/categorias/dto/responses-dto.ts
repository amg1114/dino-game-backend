import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../categoria.entity';

export class CategoriasNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Las categorias no fueron encontradas',
  })
  message: string;
}

export class CategoriasLimitBadRequestResponseDto {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Invalid limit value',
  })
  message: string;
}

export class CategoriasOffsetBadRequestResponseDto {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Invalid offset value',
  })
  message: string;
}

export class CategoriasOrderBadRequestResponseDto {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Invalid order value',
  })
  message: string;
}

export class CategoriasTitleBadRequestResponseDto {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Invalid title value',
  })
  message: string;
}

export class CategoriaNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'La categoria no fue encontrada',
  })
  message: string;
}

export class CategoriaConflictResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'La categoria ya existe',
  })
  message: string;
}

export class DeleteCategoriaResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Categoria was not deleted',
  })
  message: string;
}
export class ResponseCategoriasDto {
  @ApiProperty({
    type: [Categoria],
  })
  data: Categoria[];
  @ApiProperty({
    example: 0,
  })
  offset: number;
  @ApiProperty({
    example: 10,
  })
  limit: number;
  @ApiProperty({
    example: 100,
  })
  total: number;
}
