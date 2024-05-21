import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegisterAssetDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    url: string;
   
    @IsNumber()
    @IsNotEmpty()
    index: number;
}