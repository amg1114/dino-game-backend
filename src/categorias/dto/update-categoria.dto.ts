import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
