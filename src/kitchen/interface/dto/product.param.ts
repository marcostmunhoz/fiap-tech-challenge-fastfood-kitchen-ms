import {
  EntityIdValueObject,
  ProductCodeValueObject,
  TransformPrimitiveToValueObject,
  TransformStringToEntityId,
} from '@marcostmunhoz/fastfood-libs';
import { IsOptional, IsString } from 'class-validator';

export class ProductIdParam {
  @IsOptional()
  @IsString()
  @TransformStringToEntityId()
  id: EntityIdValueObject;
}

export class ProductCodeParam {
  @IsOptional()
  @IsString()
  @TransformPrimitiveToValueObject(ProductCodeValueObject)
  code: ProductCodeValueObject;
}
