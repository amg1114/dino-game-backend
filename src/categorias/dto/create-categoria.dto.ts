import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;
    
    @IsString()
    @IsOptional()
    descripcion: string;
}