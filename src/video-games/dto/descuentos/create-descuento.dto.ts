import { IsDate, IsDecimal, IsNotEmpty } from "class-validator";

export class CreateDescuentoDto {
    /**
     * Porcentaje de descuento
     */
    @IsDecimal()
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