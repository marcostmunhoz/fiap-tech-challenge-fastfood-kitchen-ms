import {
  EntityIdValueObject,
  TransformStringToEntityId,
} from '@marcostmunhoz/fastfood-libs';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductParam {
  @IsNotEmpty()
  @IsString()
  @TransformStringToEntityId()
  id: EntityIdValueObject;
}
