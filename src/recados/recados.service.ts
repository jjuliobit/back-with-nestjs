import {Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recados.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
    private lastId = 1;
    private recados: Recado[] = [
        {
            id: '1',
            texto: 'Este é um recado de teste.',
            de: 'João',
            para: 'Maria',
            lido: false,
            data: new Date(),
        }
    ];

    throwNotFoundError() {
        throw new NotFoundException('Recado não encotrando');
    }
    
    findAll() {
        const recado = this.recados;
        if(recado) {
            return recado
        } else {
            this.throwNotFoundError()
        }
    }

    findOne(id: string) {
        const recado = this.recados.find(recado => recado.id === id);
        if(recado) {
            return recado
        } else {
            this.throwNotFoundError()
        }
    }

    create(createRecadoDto: CreateRecadoDto) {
        this.lastId++;
        const id = String(this.lastId);
        const novoRecado = {
            id,
            ...createRecadoDto,
            lido: false,
            data: new Date(),
        };
        this.recados.push(novoRecado);
        return novoRecado;
    }

    update(id: string, updateRecadoDto: UpdateRecadoDto) {
        const recado = this.recados.find(item => item.id === id);
    
        if (!recado) return this.throwNotFoundError();
    
        Object.assign(recado, updateRecadoDto);
    
        return recado;
    }

    

    remove(id: number) {
        const recadoExstenteIndex = this.recados.findIndex(
            item => item.id === +id
        );
    
        if (recadoExstenteIndex < 0) {
            this.throwNotFoundError();
        }
    
        const recado = this.recados[recadoExstenteIndex];
        this.recados.splice(recadoExstenteIndex, 1);
        return recado
    }
     
}