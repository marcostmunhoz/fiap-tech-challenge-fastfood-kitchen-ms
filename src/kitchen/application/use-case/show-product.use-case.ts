import { CompleteProductEntityProps } from '@/kitchen/domain/entity/product.entity';
import { ProductRepository } from '@/kitchen/domain/repository/product.repository.interface';
import { ProductRepositoryToken } from '@/kitchen/tokens';
import {
  EntityIdValueObject,
  EntityNotFoundException,
  ProductCodeValueObject,
  UseCase,
} from '@marcostmunhoz/fastfood-libs';
import { Inject } from '@nestjs/common';

export type SearchByCodeInput = {
  code: ProductCodeValueObject;
};

export type SearchByIdInput = {
  id: EntityIdValueObject;
};

export type Input = SearchByCodeInput | SearchByIdInput;

export type Output = CompleteProductEntityProps;

export class ShowProductUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(ProductRepositoryToken)
    private readonly repository: ProductRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const entity =
      'id' in input
        ? await this.repository.findById(input.id)
        : await this.repository.findByCode(input.code);

    if (!entity) {
      throw new EntityNotFoundException(
        'Product not found with given code or ID.',
      );
    }

    return entity;
  }
}
