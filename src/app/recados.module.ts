import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      autoLoadEntities: true, // carrega entidades registradas com forFeature
      synchronize: true, // sincroniza com o DB. Nao deve ser usado em producao.
    }),
    TypeOrmModule.forFeature([Recado]) , PessoasModule,
  ],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
