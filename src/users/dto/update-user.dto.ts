import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Sexo } from '../../config/enums/sexo.enum';
import { Role } from '../../config/enums/roles.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsDate()
  @IsOptional()
  fechaNacimiento?: Date;

  @IsEnum(Sexo)
  @IsOptional()
  sexo?: Sexo;

  @IsString()
  @IsOptional()
  pais?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role; // Cambiar 'tipo' por 'role'

  @IsString()
  @IsOptional()
  password?: string;
}
