import { ShowProductUseCase } from '@/kitchen/application/use-case/show-product.use-case';
import {
  DefaultInternalServerErrorResponse,
  DefaultNotFoundResponse,
  mapObjectToResponse,
  UuidParam,
} from '@marcostmunhoz/fastfood-libs';
import { Controller, Get, HttpCode, Inject, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductParam } from '../dto/product.param';
import { ProductResponse } from '../dto/product.response';

@ApiTags('Products')
@Controller('products')
export class ShowProductController {
  constructor(
    @Inject(ShowProductUseCase)
    private readonly useCase: ShowProductUseCase,
  ) {}

  @Get(':id')
  @HttpCode(200)
  @UuidParam({ name: 'id' })
  @ApiOkResponse({ type: ProductResponse })
  @DefaultInternalServerErrorResponse()
  @DefaultNotFoundResponse()
  async execute(@Param() param: ProductParam): Promise<ProductResponse> {
    const result = await this.useCase.execute(param);

    return mapObjectToResponse(ProductResponse, result);
  }
}
