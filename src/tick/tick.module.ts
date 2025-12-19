import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tick } from './entities/tick.entity';
import { TickService } from './tick.service';
import { TickController } from './tick.controller';
// import { TickDoc } from './entities/tick-doc.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Tick, 
      // TickDoc
    ])
  ],
  controllers: [TickController],
  providers: [TickService],
  exports: [TickService],
})
export class TickModule {}
