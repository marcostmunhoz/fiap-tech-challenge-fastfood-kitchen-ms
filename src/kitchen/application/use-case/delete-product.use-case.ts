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

export type Output = void;

export class DeleteProductUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(ProductRepositoryToken)
    private readonly repository: ProductRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const exists = await this.repository.existsWithId(input.id);

    if (!exists) {
      throw new EntityNotFoundException('Product not found with given ID.');
    }

    await this.repository.delete(input.id);
  }
}
