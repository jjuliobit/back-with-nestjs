import { forwardRef, Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { Pessoa } from './entities/pessoa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosModule } from 'src/app_V2/recados.module';
import { ONLY_LOWERCASE_LETTERS_REGEX, REMOVE_SPACES_REGEX } from 'src/app_V2/recados.constant';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { RemoveSpacesRegex } from 'src/common/regex/remove.spaces.regex';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa]),
  forwardRef(() => RecadosModule),
  ],
  controllers: [PessoasController],
  providers: [PessoasService,
    {
      provide: 'SERVER_NAME',
      useValue: 'NestJSMy name is NestJS',
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useClass: RemoveSpacesRegex,
    },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,
      useClass: OnlyLowercaseLettersRegex,
    },
  ],
  exports: [PessoasService],
})
export class PessoasModule { }
