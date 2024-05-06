import { IsString, IsNotEmpty } from "class-validator";

export class CreateSolicitudDesarrolladorDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;
}