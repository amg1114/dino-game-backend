import { IsOptional, IsString, IsDate, IsNumber } from "class-validator";

export class UpdateVideoGameDto {
    @IsString()
    @IsOptional()
    titulo?:string;
    
    @IsNumber()
    @IsOptional()
    precio?: number;
    
    @IsString()
    @IsOptional()
    descripcion?: string;
    
    @IsDate()
    @IsOptional()
    fechaLanzamiento?: Date;
}