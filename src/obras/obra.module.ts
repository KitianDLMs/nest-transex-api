import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { ObraController } from './obra.controller';
import { ObraService } from './obra.service';

import { Obra, ObraImage } from './entities';

@Module({
  controllers: [ObraController],
  providers: [ObraService],
  imports: [
    TypeOrmModule.forFeature([ Obra, ObraImage ]),
    AuthModule,
  ],
  exports: [
    ObraService,
    TypeOrmModule,
  ]
})
export class ObraModule {}
