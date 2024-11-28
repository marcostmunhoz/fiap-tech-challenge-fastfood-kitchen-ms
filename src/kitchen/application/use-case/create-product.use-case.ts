import {
  CompleteProductEntityProps,
  PartialProductEntityProps,
} from '@/kitchen/domain/entity/product.entity';
import { ProductFactory } from '@/kitchen/domain/factory/product.factory';
import { ProductRepository } from '@/kitchen/domain/repository/product.repository.interface';
import { ProductRepositoryToken } from '@/kitchen/tokens';
import {
  EntityAlreadyExistsException,
  UseCase,
} from '@marcostmunhoz/fastfood-libs';
import { Inject } from '@nestjs/common';

export type Input = PartialProductEntityProps;

export type Output = CompleteProductEntityProps;

export class CreateProductUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly factory: ProductFactory,
    @Inject(ProductRepositoryToken)
    private readonly repository: ProductRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const exists = await this.repository.existsWithCode(input.code);

    if (exists) {
      throw new EntityAlreadyExistsException(
        'Product already exists with given code.',
      );
    }

    const entity = this.factory.createProduct(input);

    return await this.repository.save(entity);
  }
}
