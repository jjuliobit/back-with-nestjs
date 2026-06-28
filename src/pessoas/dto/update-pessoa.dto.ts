import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsNotEmpty } from 'class-validator';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    nome?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @IsOptional()
    password?: string;


}
