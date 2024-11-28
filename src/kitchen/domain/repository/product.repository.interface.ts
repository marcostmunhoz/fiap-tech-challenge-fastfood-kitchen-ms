import {
  EntityIdValueObject,
  ProductCategoryEnum,
  ProductCodeValueObject,
} from '@marcostmunhoz/fastfood-libs';
import { ProductEntity } from '../entity/product.entity';

export type SearchProductQuery = {
  query?: string;
  category?: ProductCategoryEnum;
};

export interface ProductRepository {
  list(): Promise<ProductEntity[]>;
  search(filter: SearchProductQuery): Promise<ProductEntity[]>;
  findById(id: EntityIdValueObject): Promise<ProductEntity | null>;
  findByCode(code: ProductCodeValueObject): Promise<ProductEntity | null>;
  save(entity: ProductEntity): Promise<ProductEntity>;
  delete(id: EntityIdValueObject): Promise<void>;
  existsWithCode(
    code: ProductCodeValueObject,
    except?: EntityIdValueObject,
  ): Promise<boolean>;
  existsWithId(id: EntityIdValueObject): Promise<boolean>;
}
