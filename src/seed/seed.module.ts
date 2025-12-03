import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { ProductsModule } from './../products/products.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ObraModule } from 'src/obras/obra.module';
import { CustModule } from 'src/cust/cust.module';
import { CustService } from 'src/cust/cust.service';
import { ImstModule } from 'src/imst/imst.module';
import { OrdlModule } from 'src/ordl/ordl.module';
import { OrdrModule } from 'src/ordr/ordr.module';
import { PrjpModule } from 'src/prjp/prjp.module';
import { ProjModule } from 'src/proj/proj.module';
import { SchlModule } from 'src/schl/schl.module';
import { TickModule } from 'src/tick/tick.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule,
    AuthModule,
    TypeOrmModule.forFeature([User]), // para inyectar UserRepository
    ObraModule,       
    CustModule,
    ImstModule,
    OrdlModule,
    OrdrModule,
    PrjpModule,
    ProjModule,
    SchlModule, 
    TickModule
  ],
})
export class SeedModule {}
