import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UrlParam } from 'src/common/params/url-param.decorator';
import { RecadosUtils } from './recados.utils';
import { RemoveSpacesRegex } from 'src/common/regex/remove.spaces.regex';
import { REMOVE_SPACES_REGEX } from './recados.constant';
import {
  MY_DYNAMIC_CONFIG,
  type MyDynamicModuleConfigs,
} from './my-dynamic/my-dynamic.module';
// Scope.DEFAULT -> singleton (uma instância para toda a app)
// Scope.REQUEST -> nova instância a cada requisição HTTP
// Scope.TRANSIENT -> nova instância para cada classe que injeta o provider

@Controller('recados-v2')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RemoveSpacesRegex,
    @Inject(MY_DYNAMIC_CONFIG)
    private readonly dynamicConfig: MyDynamicModuleConfigs,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() paginationDto: PaginationDto, @UrlParam() url: string) {
    console.log(this.removeSpacesRegex.execute('REMOVER ESPAÇOS'));
    console.log('Dynamic config:', this.dynamicConfig);
    console.log('Controller RecadosUtils id:', this.recadosUtils.getInstanceId());
    const recados = this.recadosService.findAll(paginationDto);
    return recados;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
