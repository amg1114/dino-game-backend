import { IsString, IsNotEmpty, IsNumber, IsDate } from "class-validator";

export class CreateVersionDto {
    @IsString()
    @IsNotEmpty()
    version: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    size: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsDate()
    @IsNotEmpty()
    releaseDate: Date;
}