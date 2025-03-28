import { ApiProperty } from '@nestjs/swagger';
import { Noticia } from '../noticia.entity';

export class NoticiasNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'No noticias found',
  })
  message: string;
}

export class NoticiaNotFoundResponseDto {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Noticia not found',
  })
  message: string;
}

export class NoticiaFoundResponseDto {
  @ApiProperty({
    example: Noticia,
  })
  data: Noticia;

  @ApiProperty({
    example: '2',
  })
  offset: number;

  @ApiProperty({
    example: '10',
  })
  total: number;
}
