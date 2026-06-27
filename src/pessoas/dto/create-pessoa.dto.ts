import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePessoaDto {
    
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;
}