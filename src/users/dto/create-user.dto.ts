import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Sexo } from 'src/config/enums/sexo.enum'

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    nombre : string
    
    @IsDate()
    @IsNotEmpty()
    fechaNacimiento : Date
    
    @IsEnum(Sexo)
    @IsNotEmpty()
    sexo : Sexo
    
    @IsString()
    @IsNotEmpty()
    pais : string
    
    @IsEmail()
    @IsNotEmpty()
    correo : string
}