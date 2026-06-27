import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
  ) {}

  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    return await this.recadosRepository.find();
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({ where: { id } });

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadosRepository.create(novoRecado);
    return this.recadosRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };
    const recado = await this.recadosRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recado) {
      throw new NotFoundException(`Recado com id ${id} não encontrado.`);
    }

    return this.recadosRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadosRepository.findOneBy({ id });

    if (!recado) {
      throw new NotFoundException(`Recado com id ${id} não encontrado.`);
    }

    return this.recadosRepository.remove(recado);
  }
}
