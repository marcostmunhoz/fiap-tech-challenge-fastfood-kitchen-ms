import { PartialProductEntityProps } from '@/kitchen/domain/entity/product.entity';
import { ProductRepository } from '@/kitchen/domain/repository/product.repository.interface';
import { ProductRepositoryToken } from '@/kitchen/tokens';
import {
  EntityAlreadyExistsException,
  EntityIdValueObject,
  EntityNotFoundException,
  UseCase,
} from '@marcostmunhoz/fastfood-libs';
import { Inject } from '@nestjs/common';

export type Input = {
  id: EntityIdValueObject;
  data: PartialProductEntityProps;
};

export type Output = void;

export class UpdateProductUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(ProductRepositoryToken)
    private readonly repository: ProductRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);

    if (!entity) {
      throw new EntityNotFoundException('Product not found with given ID.');
    }

    const exists = await this.repository.existsWithCode(
      input.data.code,
      entity.id,
    );

    if (exists) {
      throw new EntityAlreadyExistsException(
        'Another product already exists with given code.',
      );
    }

    const updatedEntity = entity
      .setCode(input.data.code)
      .setName(input.data.name)
      .setDescription(input.data.description)
      .setCategory(input.data.category)
      .setPrice(input.data.price);

    await this.repository.save(updatedEntity);
  }
}
