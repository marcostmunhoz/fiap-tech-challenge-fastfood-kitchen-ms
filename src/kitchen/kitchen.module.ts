import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductUseCase } from './application/use-case/create-product.use-case';
import { DeleteProductUseCase } from './application/use-case/delete-product.use-case';
import { SearchProductsUseCase } from './application/use-case/search-products.use-case';
import { ShowProductUseCase } from './application/use-case/show-product.use-case';
import { UpdateProductUseCase } from './application/use-case/update-product.use-case';
import { ProductFactory } from './domain/factory/product.factory';
import { ProductEntity } from './infrastructure/entity/product.entity';
import { TypeOrmProductRepository } from './infrastructure/repository/type-orm-product.repository';
import { CreateProductController } from './interface/controller/create-product.controller';
import { DeleteProductController } from './interface/controller/delete-product.controller';
import { SearchProductsController } from './interface/controller/search-products.controller';
import { ShowProductController } from './interface/controller/show-product.controller';
import { UpdateProductController } from './interface/controller/update-product.controller';
import { ProductRepositoryToken } from './tokens';

const useCases: Provider[] = [
  CreateProductUseCase,
  ShowProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  SearchProductsUseCase,
];
const factories = [ProductFactory];
const tokens: Provider[] = [
  {
    provide: ProductRepositoryToken,
    useClass: TypeOrmProductRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [...useCases, ...factories, ...tokens],
  controllers: [
    CreateProductController,
    ShowProductController,
    UpdateProductController,
    DeleteProductController,
    SearchProductsController,
  ],
})
export class KitchenModule {}
