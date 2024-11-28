import {
  getCompleteProductData,
  ProductData,
} from '@marcostmunhoz/fastfood-libs';
import {
  CompleteProductEntityProps,
  ProductEntity as DomainProductEntity,
} from '../domain/entity/product.entity';
import { ProductFactory } from '../domain/factory/product.factory';
import { ProductRepository } from '../domain/repository/product.repository.interface';
import { ProductEntity as InfrastructureProductEntity } from '../infrastructure/entity/product.entity';

export const getDomainProductEntity = (
  props: Partial<CompleteProductEntityProps> = {},
): DomainProductEntity => {
  const defaultProps = getCompleteProductData();

  return new DomainProductEntity({
    id: props.id || defaultProps.id,
    code: props.code || defaultProps.code,
    name: props.name || defaultProps.name,
    description: props.description || defaultProps.description,
    category: props.category || defaultProps.category,
    price: props.price || defaultProps.price,
    createdAt: props.createdAt || defaultProps.createdAt,
    updatedAt: props.updatedAt || defaultProps.updatedAt,
  });
};

export const getInfrastructureProductEntity = (
  props: Partial<ProductData> = {},
): InfrastructureProductEntity => {
  const defaultProps = getCompleteProductData();

  return {
    id: props.id?.value || defaultProps.id.value,
    code: props.code?.value || defaultProps.code.value,
    name: props.name?.value || defaultProps.name.value,
    description: props.description?.value || defaultProps.description.value,
    category: props.category || defaultProps.category,
    price: props.price?.value || defaultProps.price.value,
    createdAt: props.createdAt || defaultProps.createdAt,
    updatedAt: props.updatedAt || defaultProps.updatedAt,
  };
};

export const getProductFactoryMock = (): jest.Mocked<ProductFactory> =>
  ({
    createProduct: jest.fn(),
  }) as unknown as jest.Mocked<ProductFactory>;

export const getProductRepositoryMock = (): jest.Mocked<ProductRepository> => ({
  list: jest.fn(),
  search: jest.fn(),
  findById: jest.fn(),
  findByCode: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  existsWithCode: jest.fn(),
  existsWithId: jest.fn(),
});
