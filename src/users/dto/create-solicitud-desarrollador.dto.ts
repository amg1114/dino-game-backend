import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSolicitudDesarrolladorDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
