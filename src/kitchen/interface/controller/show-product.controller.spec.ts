import {
  Output,
  ShowProductUseCase,
} from '@/kitchen/application/use-case/show-product.use-case';
import { getCompleteProductData } from '@marcostmunhoz/fastfood-libs';
import { Test, TestingModule } from '@nestjs/testing';
import { ShowProductController } from './show-product.controller';

describe('ShowProductController', () => {
  let useCaseMock: jest.Mocked<ShowProductUseCase>;
  let controller: ShowProductController;

  beforeEach(async () => {
    useCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ShowProductUseCase>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ShowProductUseCase,
          useValue: useCaseMock,
        },
      ],
      controllers: [ShowProductController],
    }).compile();

    controller = module.get<ShowProductController>(ShowProductController);
  });

  describe('execute', () => {
    it('should return an existing product', async () => {
      // Arrange
      const props = getCompleteProductData();
      const { id } = props;
      const output: Output = props;
      useCaseMock.execute.mockResolvedValue(output);

      // Act
      const response = await controller.execute({ id });

      // Assert
      expect(useCaseMock.execute).toHaveBeenCalledTimes(1);
      expect(useCaseMock.execute).toHaveBeenCalledWith({ id });
      expect(response).toEqual({
        id: output.id.value,
        code: output.code.value,
        name: output.name.value,
        description: output.description.value,
        price: output.price.valueAsFloat,
        category: output.category,
        createdAt: output.createdAt,
        updatedAt: output.updatedAt,
      });
    });
  });
});
