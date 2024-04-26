import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticiaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDate()
  @IsNotEmpty()
  fecha: Date;
}
