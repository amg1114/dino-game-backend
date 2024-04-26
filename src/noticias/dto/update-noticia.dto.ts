import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateNoticiaDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
  
  @IsDate()
  @IsOptional()
  fecha?: Date;
}
