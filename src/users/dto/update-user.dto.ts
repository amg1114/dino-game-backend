import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { Sexo } from 'src/config/enums/sexo.enum'

export class UpdateUserDto {

    @IsString()
    @IsOptional()
    nombre? : string
    
    @IsDate()
    @IsOptional()
    fechaNacimiento? : Date
    
    @IsEnum(Sexo)
    @IsOptional()
    sexo? : Sexo
    
    @IsString()
    @IsOptional()
    pais? : string
    
    @IsEmail()
    @IsOptional()
    correo? : string

    @IsString()
    @IsOptional()
    password? : string
}