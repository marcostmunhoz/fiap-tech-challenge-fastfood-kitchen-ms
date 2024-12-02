import { ShowProductUseCase } from '@/kitchen/application/use-case/show-product.use-case';
import {
  DefaultInternalServerErrorResponse,
  DefaultNotFoundResponse,
  mapObjectToResponse,
  UuidParam,
} from '@marcostmunhoz/fastfood-libs';
import { Controller, Get, HttpCode, Inject, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductCodeParam, ProductIdParam } from '../dto/product.param';
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
  async findById(@Param() param: ProductIdParam): Promise<ProductResponse> {
    const result = await this.useCase.execute(param);

    return mapObjectToResponse(ProductResponse, result);
  }

  @Get('code/:code')
  @HttpCode(200)
  @ApiParam({
    name: 'code',
    type: String,
    example: 'PRD-001',
  })
  @ApiOkResponse({ type: ProductResponse })
  @DefaultInternalServerErrorResponse()
  @DefaultNotFoundResponse()
  async findByCode(@Param() param: ProductCodeParam): Promise<ProductResponse> {
    const result = await this.useCase.execute(param);

    return mapObjectToResponse(ProductResponse, result);
  }
}
