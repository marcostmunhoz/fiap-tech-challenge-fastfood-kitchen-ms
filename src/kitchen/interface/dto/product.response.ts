import {
  MoneyValueObject,
  ProductCategoryEnum,
  TransformObjectKeyOptional,
  TransformValueObjectToPrimitive,
  UuidProperty,
} from '@marcostmunhoz/fastfood-libs';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductResponse {
  @Expose()
  @TransformValueObjectToPrimitive()
  @UuidProperty()
  id: string;

  @Expose()
  @TransformValueObjectToPrimitive()
  @ApiProperty({
    example: 'PRD-001',
  })
  code: string;

  @Expose()
  @TransformValueObjectToPrimitive()
  @ApiProperty({
    example: 'Product Name',
  })
  name: string;

  @Expose()
  @TransformValueObjectToPrimitive()
  @ApiProperty({
    example: 'Product Description',
  })
  description: string;

  @Expose()
  @TransformObjectKeyOptional((obj) => (obj as MoneyValueObject).valueAsFloat)
  @ApiProperty({
    example: 10.99,
  })
  price: number;

  @Expose()
  @ApiProperty({
    example: ProductCategoryEnum.DRINK,
    enum: ProductCategoryEnum,
  })
  category: string;

  @Expose()
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
