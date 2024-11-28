import { ProductFactory } from '@/kitchen/domain/factory/product.factory';
import { ProductRepository } from '@/kitchen/domain/repository/product.repository.interface';
import {
  getDomainProductEntity,
  getProductFactoryMock,
  getProductRepositoryMock,
} from '@/kitchen/testing/helpers';
import {
  EntityAlreadyExistsException,
  getPartialProductData,
} from '@marcostmunhoz/fastfood-libs';
import { CreateProductUseCase, Output } from './create-product.use-case';

describe('CreateProductUseCase', () => {
  let factoryMock: jest.Mocked<ProductFactory>;
  let repositoryMock: jest.Mocked<ProductRepository>;
  let sut: CreateProductUseCase;

  beforeEach(() => {
    repositoryMock = getProductRepositoryMock();
    factoryMock = getProductFactoryMock();
    sut = new CreateProductUseCase(factoryMock, repositoryMock);
  });

  describe('execute', () => {
    it('should create a new product when the given code does not exist', async () => {
      // Arrange
      const props = getPartialProductData();
      const entity = getDomainProductEntity(props);
      const output: Output = entity;
      repositoryMock.existsWithCode.mockResolvedValue(false);
      factoryMock.createProduct.mockReturnValue(entity);
      repositoryMock.save.mockResolvedValue(entity);

      // Act
      const result = await sut.execute(props);

      // Assert
      expect(factoryMock.createProduct).toHaveBeenCalledTimes(1);
      expect(factoryMock.createProduct).toHaveBeenCalledWith(props);
      expect(repositoryMock.existsWithCode).toHaveBeenCalledTimes(1);
      expect(repositoryMock.existsWithCode).toHaveBeenCalledWith(props.code);
      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
      expect(repositoryMock.save).toHaveBeenCalledWith(entity);
      expect(result).toEqual(output);
    });

    it('should throw an error when a product with the given code already exists', async () => {
      // Arrange
      const props = getPartialProductData();
      repositoryMock.existsWithCode.mockResolvedValue(true);

      // Act
      const result = sut.execute(props);

      // Assert
      expect(result).rejects.toThrow(
        new EntityAlreadyExistsException(
          'Product already exists with given code.',
        ),
      );
    });
  });
});
