import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImstService } from './imst.service';
import { ImstController } from './imst.controller';
import { Imst } from './entities/imst.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Imst])],
  providers: [ImstService],
  controllers: [ImstController],
  exports: [ImstService]
})
export class ImstModule {}
