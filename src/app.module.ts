// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { Product } from './products/models/product.model';
import { ApiLogsModule } from './apilogs/apilogs.module';
import { ApiLog } from './apilogs/models/apilogs.model';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiLogsInterceptor } from './common/interceptors/api-logs.interceptor';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        models: [User, Product, ApiLog],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    ProductsModule,
    ApiLogsModule,
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiLogsInterceptor,
    },
  ],


})  
export class AppModule {}
