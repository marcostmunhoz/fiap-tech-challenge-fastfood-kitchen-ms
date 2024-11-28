import { SearchProductsUseCase } from '@/kitchen/application/use-case/search-products.use-case';
import {
  DefaultInternalServerErrorResponse,
  mapObjectToResponse,
} from '@marcostmunhoz/fastfood-libs';
import { Controller, Get, HttpCode, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductQuery } from '../dto/product.query';
import { ProductResponse } from '../dto/product.response';

@ApiTags('Products')
@Controller('products')
export class SearchProductsController {
  constructor(
    @Inject(SearchProductsUseCase)
    private readonly useCase: SearchProductsUseCase,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiQuery({ type: ProductQuery })
  @ApiOkResponse({ type: ProductResponse, isArray: true })
  @DefaultInternalServerErrorResponse()
  async execute(@Query() query: ProductQuery): Promise<ProductResponse[]> {
    const result = await this.useCase.execute(query);

    return mapObjectToResponse(
      ProductResponse,
      result,
    ) as unknown as ProductResponse[];
  }
}
