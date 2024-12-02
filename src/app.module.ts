import {
  FastfoodLibsModule,
  TypeOrmModuleOptionsToken,
} from '@marcostmunhoz/fastfood-libs';
import { FastfoodLibsModuleOptions } from '@marcostmunhoz/fastfood-libs/lib/fastfood-libs-options.type';
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
      useFactory: () => {
        return {
          database: {
            migrations,
            migrationsTransactionMode: 'none',
            runMigrationsOnStartup: false,
            synchronize: true,
          },
        } as FastfoodLibsModuleOptions;
      },
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
