import { DeleteProductUseCase } from '@/kitchen/application/use-case/delete-product.use-case';
import {
  DefaultBadRequestResponse,
  DefaultInternalServerErrorResponse,
  DefaultNotFoundResponse,
  DefaultUnprocessableEntityResponse,
  UuidParam,
} from '@marcostmunhoz/fastfood-libs';
import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductIdParam } from '../dto/product.param';

@ApiTags('Products')
@Controller('products')
export class DeleteProductController {
  constructor(
    @Inject(DeleteProductUseCase)
    private readonly useCase: DeleteProductUseCase,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  @UuidParam({ name: 'id' })
  @ApiOkResponse()
  @DefaultBadRequestResponse()
  @DefaultUnprocessableEntityResponse()
  @DefaultInternalServerErrorResponse()
  @DefaultNotFoundResponse()
  async execute(@Param() param: ProductIdParam): Promise<void> {
    await this.useCase.execute(param);
  }
}
