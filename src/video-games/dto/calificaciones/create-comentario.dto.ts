import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateComentarioDto {
  @ApiProperty({
    example: 'Este videojuego es increíble, lo recomiendo mucho.',
    description: 'Comentario sobre el videojuego',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  comentario: string;
}
