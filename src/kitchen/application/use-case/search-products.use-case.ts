import { CompleteProductEntityProps } from '@/kitchen/domain/entity/product.entity';
import {
  ProductRepository,
  SearchProductQuery,
} from '@/kitchen/domain/repository/product.repository.interface';
import { ProductRepositoryToken } from '@/kitchen/tokens';
import { UseCase } from '@marcostmunhoz/fastfood-libs';
import { Inject } from '@nestjs/common';

export type Input = SearchProductQuery;

export type Output = CompleteProductEntityProps[];

export class SearchProductsUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(ProductRepositoryToken)
    private readonly repository: ProductRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    return await this.repository.search(input);
  }
}
