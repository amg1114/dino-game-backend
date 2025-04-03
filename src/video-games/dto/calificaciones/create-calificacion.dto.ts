import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCalificacionDto {
  @ApiProperty({
    example: 1,
    description: 'Valor de la calificación del videojuego',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  puntaje: number;
}
