import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImstService } from './imst.service';
import { ImstController } from './imst.controller';
import { Imst } from './entities/imst.entity';
import { Proj } from 'src/proj/entities/proj.entity';
import { Prjp } from 'src/prjp/entities/prjp.entity';
import { Ordl } from 'src/ordl/entities/ordl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Imst, Proj, Prjp, Ordl])],
  providers: [ImstService],
  controllers: [ImstController],
  exports: [ImstService]
})
export class ImstModule {}
