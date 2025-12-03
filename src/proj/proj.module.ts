import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proj } from './entities/proj.entity';
import { ProjService } from './proj.service';
import { ProjController } from './proj.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proj])],
  providers: [ProjService],
  controllers: [ProjController],
  exports: [ProjService]
})
export class ProjModule {}
