import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { RecadosUtils } from 'src/app_V2/recados.utils';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from 'src/app_V2/recados.constant';

@Controller('pessoas')
export class PessoasController {
  constructor(
    private readonly pessoasService: PessoasService,
    private readonly recadosUtils: RecadosUtils,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RegexProtocol,
    @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
    private readonly onlyLowercaseLettersRegex: RegexProtocol,
  ) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  findAll() {
    console.log(this.removeSpacesRegex.execute(this.serverName));
    console.log(this.onlyLowercaseLettersRegex.execute(this.serverName));
    console.log(this.serverName);
    return this.pessoasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pessoasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pessoasService.remove(+id);
  }
}
