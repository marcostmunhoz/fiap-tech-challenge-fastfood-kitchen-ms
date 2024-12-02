import { ProductRepository } from '@/kitchen/domain/repository/product.repository.interface';
import {
  getDomainProductEntity,
  getProductRepositoryMock,
} from '@/kitchen/testing/helpers';
import {
  EntityNotFoundException,
  getValidProductCode,
  getValidProductEntityId,
} from '@marcostmunhoz/fastfood-libs';
import { ShowProductUseCase } from './show-product.use-case';

describe('ShowProductUseCase', () => {
  let sut: ShowProductUseCase;
  let repository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    repository = getProductRepositoryMock();
    sut = new ShowProductUseCase(repository);
  });

  describe('execute', () => {
    it('should return an existing product with given id', async () => {
      // Arrange
      const entity = getDomainProductEntity();
      repository.findById.mockResolvedValue(entity);

      // Act
      await sut.execute({ id: entity.id });

      // Assert
      expect(repository.findById).toHaveBeenCalledTimes(1);
      expect(repository.findById).toHaveBeenCalledWith(entity.id);
    });

    it('should return an existing product with given code', async () => {
      // Arrange
      const entity = getDomainProductEntity();
      repository.findByCode.mockResolvedValue(entity);

      // Act
      await sut.execute({ code: entity.code });

      // Assert
      expect(repository.findByCode).toHaveBeenCalledTimes(1);
      expect(repository.findByCode).toHaveBeenCalledWith(entity.code);
    });

    it('should throw when product does not exists with given id', async () => {
      // Arrange
      const id = getValidProductEntityId();
      repository.findById.mockResolvedValue(null);

      // Act
      const result = sut.execute({ id });

      // Assert
      expect(result).rejects.toThrow(
        new EntityNotFoundException('Product not found with given code or ID.'),
      );
    });

    it('should throw when product does not exists with given code', async () => {
      // Arrange
      const code = getValidProductCode();
      repository.findByCode.mockResolvedValue(null);

      // Act
      const result = sut.execute({ code });

      // Assert
      expect(result).rejects.toThrow(
        new EntityNotFoundException('Product not found with given code or ID.'),
      );
    });
  });
});
