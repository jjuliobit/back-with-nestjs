import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { OutroMiddleware } from 'src/common/middlewares/outro.middleware';
import { MyExceptionFilter } from 'src/common/filters/my-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

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
  providers: [RecadosService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    }
  ],
})
export class RecadosModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes(
      {
        path: '*',
        method: RequestMethod.ALL,
      },
    );
  }
}
