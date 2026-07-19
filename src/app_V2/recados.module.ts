import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from 'src/app/entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';
import { RegexFactory } from 'src/common/regex/regex.factory';
import { REMOVE_SPACES_REGEX } from './recados.constant';
import { MyDynamicModule } from './my-dynamic/my-dynamic.module';

@Module({
  imports: [
    MyDynamicModule.register({
      apiKey: 'minha-api-key-secreta',
      apiUrl: 'https://api.exemplo.com',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadosUtils,
    RegexFactory,
    {
      provide: REMOVE_SPACES_REGEX, // token
      useFactory: async(regexFactory: RegexFactory) => { 
        // espera alguma coisa acontecer
        console.log('ESPERANDO: vou aguardar a promise abaixo ser resolvida')
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('PRONTO: vou aguardar a promise abaixo ser resolvida')
        // Meu código/lógica
        return regexFactory.create('RemoveSpacesRegex');
 
      }, // factory
      inject: [RegexFactory], // injectando na factory na ordem
    }
  ],
  exports: [RecadosUtils],
})
export class RecadosModule { }
