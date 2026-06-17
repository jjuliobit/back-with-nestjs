import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateRecadoDto {

  @IsString({
    message: 'O texto deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O texto é obrigatório',
  })
  @MinLength(3, {
    message: 'O texto deve ter pelo menos 3 caracteres',
  })
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  readonly de: string;
  
  @IsString()
  @IsNotEmpty()
  readonly para: string;
}