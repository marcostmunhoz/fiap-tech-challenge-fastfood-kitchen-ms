import { UpdateProductUseCase } from '@/kitchen/application/use-case/update-product.use-case';
import {
  DefaultBadRequestResponse,
  DefaultInternalServerErrorResponse,
  DefaultUnprocessableEntityResponse,
  UuidParam,
} from '@marcostmunhoz/fastfood-libs';
import { Body, Controller, HttpCode, Inject, Param, Put } from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { ProductIdParam } from '../dto/product.param';
import { ProductRequest } from '../dto/product.request';

@ApiTags('Products')
@Controller('products')
export class UpdateProductController {
  constructor(
    @Inject(UpdateProductUseCase)
    private readonly useCase: UpdateProductUseCase,
  ) {}

  @Put(':id')
  @HttpCode(204)
  @UuidParam({ name: 'id' })
  @ApiNoContentResponse()
  @DefaultBadRequestResponse()
  @DefaultUnprocessableEntityResponse()
  @DefaultInternalServerErrorResponse()
  async execute(
    @Param() param: ProductIdParam,
    @Body() request: ProductRequest,
  ): Promise<void> {
    await this.useCase.execute({ id: param.id, data: request });
  }
}
