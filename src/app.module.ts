import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { ObraModule } from './obras/obra.module';
import { CustModule } from './cust/cust.module';
import { TickModule } from './tick/tick.module';
import { SchlModule } from './schl/schl.module';
import { ProjModule } from './proj/proj.module';
import { ImstModule } from './imst/imst.module';
import { OrdlModule } from './ordl/ordl.module';
import { OrdrModule } from './ordr/ordr.module';
import { PrjpModule } from './prjp/prjp.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false, // ⚠️ importante
      },
    }),
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      // synchronize: process.env.NODE_ENV !== 'production',
      ssl: {
        rejectUnauthorized: false, // permite certificados auto-firmados
      },
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'..','public'), 
    // }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    MessagesWsModule,

    ObraModule,

    CustModule,

    TickModule,

    SchlModule,

    ProjModule,

    PrjpModule,

    OrdrModule,

    OrdlModule,

    ImstModule,

    SchlModule
  ],
})
export class AppModule {}
