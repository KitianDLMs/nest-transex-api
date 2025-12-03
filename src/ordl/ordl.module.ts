import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdlService } from './ordl.service';
import { OrdlController } from './ordl.controller';
import { Ordl } from './entities/ordl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ordl])],
  controllers: [OrdlController],
  providers: [OrdlService],
  exports: [OrdlService]
})
export class OrdlModule {}
