import { ProductCategoryEnum } from '@marcostmunhoz/fastfood-libs';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ProductQuery {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsEnum(ProductCategoryEnum)
  category?: ProductCategoryEnum;
}
