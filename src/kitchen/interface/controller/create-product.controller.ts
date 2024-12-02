import { CreateProductUseCase } from '@/kitchen/application/use-case/create-product.use-case';
import {
  DefaultBadRequestResponse,
  DefaultInternalServerErrorResponse,
  DefaultUnprocessableEntityResponse,
  mapObjectToResponse,
} from '@marcostmunhoz/fastfood-libs';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProductRequest } from '../dto/product.request';
import { ProductResponse } from '../dto/product.response';

@ApiTags('Products')
@Controller('products')
export class CreateProductController {
  constructor(
    @Inject(CreateProductUseCase)
    private readonly useCase: CreateProductUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: ProductResponse })
  @DefaultBadRequestResponse()
  @DefaultUnprocessableEntityResponse()
  @DefaultInternalServerErrorResponse()
  async execute(@Body() request: ProductRequest): Promise<ProductResponse> {
    const result = await this.useCase.execute(request);

    return mapObjectToResponse(ProductResponse, result);
  }
}
