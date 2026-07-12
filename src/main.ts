import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// import { ConceitosManualModule } from './conceitos-manual/conceitos-manual.module';
import { RecadosModule } from './app/recados.module';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(RecadosModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // retorna um erro se o corpo da requisição contiver propriedades que não estão no DTO
      transform: false, // transforma os dados da requisição para o tipo do DTO
    }),
    new ParseIntIdPipe(),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server is running on port localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
