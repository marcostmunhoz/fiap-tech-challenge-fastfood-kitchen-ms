import { CompleteProductEntityProps } from '@/kitchen/domain/entity/product.entity';
import { ProductRepository } from '@/kitchen/domain/repository/product.repository.interface';
import { ProductRepositoryToken } from '@/kitchen/tokens';
import {
  EntityIdValueObject,
  EntityNotFoundException,
  UseCase,
} from '@marcostmunhoz/fastfood-libs';
import { Inject } from '@nestjs/common';

export type Input = {
  id: EntityIdValueObject;
};

export type Output = CompleteProductEntityProps;

export class ShowProductUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(ProductRepositoryToken)
    private readonly repository: ProductRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);

    if (!entity) {
      throw new EntityNotFoundException('Product not found with given ID.');
    }

    return entity;
  }
}
