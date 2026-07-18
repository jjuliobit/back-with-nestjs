import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from 'src/app/entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RecadosUtils } from './recados.utils';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
    private readonly recadosUtils: RecadosUtils,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};
    const recados = await this.recadosRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        id: true,
        texto: true,
        lido: true,
        data: true,
        createdAt: true,
        updatedAt: true,
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }

    return recado;
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;

    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadosRepository.create(novoRecado);
    await this.recadosRepository.save(recado);
    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.recadosRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }

    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;

    if (updateRecadoDto.deId) {
      recado.de = await this.pessoasService.findOne(updateRecadoDto.deId);
    }

    if (updateRecadoDto.paraId) {
      recado.para = await this.pessoasService.findOne(updateRecadoDto.paraId);
    }

    await this.recadosRepository.save(recado);
    return this.findOne(id);
  }

  async remove(id: number) {
    const recado = await this.recadosRepository.findOneBy({ id });

    if (!recado) {
      throw new NotFoundException(`Recado com id ${id} não encontrado.`);
    }

    await this.recadosRepository.remove(recado);
    return { message: 'Recado removido com sucesso' };
  }
}
