import { Module } from '@nestjs/common';
import { ConceitosManualService } from './conceitos-manual.service';
import { ConceitosManualController } from './conceitos-manual.controller';

@Module({
  controllers: [ConceitosManualController],
  providers: [ConceitosManualService],
})
export class ConceitosManualModule {}
