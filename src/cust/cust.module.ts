import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustService } from './cust.service';
import { CustController } from './cust.controller';
import { Cust } from './entities/cust.entity';
import { Ordr } from 'src/ordr/entities/ordr.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cust, Ordr])],
  providers: [CustService],
  controllers: [CustController],
  exports: [
    CustService
  ]
})
export class CustModule {}
