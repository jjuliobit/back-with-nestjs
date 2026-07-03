import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
  ) { }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoaData = {
        nome: createPessoaDto.nome,
        email: createPessoaDto.email,
        passwordHash: createPessoaDto.password,
      }

      const novaPessoa = this.pessoasRepository.create(pessoaData);
      return await this.pessoasRepository.save(novaPessoa);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email já existe');
      }
      throw error;
    }
  }

  async findAll() {
    const pessoas = await this.pessoasRepository.find({
      order: {
        id: 'desc',
      },
    });
    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({ id });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoaData = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };
    const pessoa = await this.pessoasRepository.preload({ id, ...pessoaData });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return await this.pessoasRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({ id });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    await this.pessoasRepository.remove(pessoa);
    return { message: 'Pessoa removida com sucesso' };
  }
}
