import {
  EntityIdGeneratorHelper,
  EntityIdGeneratorHelperToken,
} from '@marcostmunhoz/fastfood-libs';
import { Inject } from '@nestjs/common';
import {
  PartialProductEntityProps,
  ProductEntity,
} from '../entity/product.entity';

export class ProductFactory {
  constructor(
    @Inject(EntityIdGeneratorHelperToken)
    private readonly entityIdGenerator: EntityIdGeneratorHelper,
  ) {}

  public createProduct(props: PartialProductEntityProps): ProductEntity {
    return new ProductEntity({
      ...props,
      id: this.entityIdGenerator.generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
