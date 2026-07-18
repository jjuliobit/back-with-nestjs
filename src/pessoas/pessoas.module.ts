import { forwardRef, Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { Pessoa } from './entities/pessoa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosModule } from 'src/app_V2/recados.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa]),
  forwardRef(() => RecadosModule),
  ],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [PessoasService],
})
export class PessoasModule { }
