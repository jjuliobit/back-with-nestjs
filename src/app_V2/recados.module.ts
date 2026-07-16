import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from 'src/app/entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { MyExceptionFilter } from 'src/common/filters/my-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { RecadosUtils } from './recados.utils';

@Module({
  imports: [
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
    PessoasModule,
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils,
      useClass: RecadosUtils,
    },
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class RecadosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
