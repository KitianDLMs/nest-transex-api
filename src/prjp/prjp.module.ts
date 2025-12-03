import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrjpService } from './prjp.service';
import { PrjpController } from './prjp.controller';
import { Prjp } from './entities/prjp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prjp])],
  controllers: [PrjpController],
  providers: [PrjpService],
  exports: [PrjpService]
})
export class PrjpModule {}
