import { IsNotEmpty, IsOptional, IsString, IsDate, IsNumber, IsArray } from "class-validator";

export class CreateVideoGameDto {
    @IsString()
    @IsNotEmpty()
    titulo:string;
    
    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsString()
    @IsOptional()
    descripcion: string;
    
    @IsDate()
    @IsNotEmpty()
    fechaLanzamiento: Date;

    @IsArray()
    @IsOptional()
    categorias?: number[];
}