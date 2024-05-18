import { IsDate, IsDecimal, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDescuentoDto {
    /**
     * Porcentaje de descuento
     */
    @IsNumber()
    @IsNotEmpty()
    porcentaje: number;

    /**
     * Fecha de inicio del descuento
     */
    @IsDate()
    @IsNotEmpty()
    fechaInicio: Date;
    
    /**
     * Fecha de fin del descuento
    */
    @IsDate()
    @IsNotEmpty()
    fechaFin: Date;
}