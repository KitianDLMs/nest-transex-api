import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schl } from './entities/schl.entity';
import { SchlService } from './schl.service';
import { SchlController } from './schl.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schl])],
  controllers: [SchlController],
  providers: [SchlService],
  exports: [SchlService],
})
export class SchlModule {}
