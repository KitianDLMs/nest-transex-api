import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdrService } from './ordr.service';
import { OrdrController } from './ordr.controller';
import { Ordr } from './entities/ordr.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ordr])],
  controllers: [OrdrController],
  providers: [OrdrService],
  exports: [OrdrService]
})
export class OrdrModule {}
