import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}