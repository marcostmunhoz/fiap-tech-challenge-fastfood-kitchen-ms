import {
  MoneyValueObject,
  ProductCategoryEnum,
  ProductCodeValueObject,
  ProductDescriptionValueObject,
  ProductNameValueObject,
  TransformPrimitiveToValueObject,
} from '@marcostmunhoz/fastfood-libs';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class ProductRequest {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  @TransformPrimitiveToValueObject(ProductCodeValueObject)
  @ApiProperty({
    example: 'PRD-001',
    type: String,
  })
  code: ProductCodeValueObject;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  @TransformPrimitiveToValueObject(ProductNameValueObject)
  @ApiProperty({
    example: 'Product Name',
    type: String,
  })
  name: ProductNameValueObject;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  @TransformPrimitiveToValueObject(ProductDescriptionValueObject)
  description: ProductDescriptionValueObject;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @Transform(({ value }) => MoneyValueObject.createFromFloat(value))
  @ApiProperty({
    example: 10.99,
    type: Number,
  })
  price: MoneyValueObject;

  @IsNotEmpty()
  @IsEnum(ProductCategoryEnum)
  @ApiProperty({
    example: ProductCategoryEnum.DRINK,
    enum: ProductCategoryEnum,
  })
  category: ProductCategoryEnum;
}
