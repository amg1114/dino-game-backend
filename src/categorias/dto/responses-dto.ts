import { ApiProperty } from '@nestjs/swagger';

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
