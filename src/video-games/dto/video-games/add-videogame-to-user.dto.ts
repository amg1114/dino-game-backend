import { IsNotEmpty, IsNumber } from "class-validator";

export class AddVideoGameToUserDto {
  @IsNumber()
  @IsNotEmpty()
  precio: number;
}