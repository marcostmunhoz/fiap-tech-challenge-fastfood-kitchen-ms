import {
  FastfoodLibsModule,
  TypeOrmModuleOptionsToken,
} from '@marcostmunhoz/fastfood-libs';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { ProductEntity } from './kitchen/infrastructure/entity/product.entity';
import * as migrations from './kitchen/infrastructure/migrations';
import { KitchenModule } from './kitchen/kitchen.module';

@Module({
  imports: [
    FastfoodLibsModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        database: {
          type: 'mysql',
          migrations,
          migrationsTransactionMode: 'none',
          runMigrationsOnStartup: true,
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (options: TypeOrmModuleOptions) => {
        return {
          ...options,
          entities: [ProductEntity],
        };
      },
      inject: [TypeOrmModuleOptionsToken],
    }),
    TypeOrmModule.forFeature([ProductEntity]),
    HealthModule,
    KitchenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
