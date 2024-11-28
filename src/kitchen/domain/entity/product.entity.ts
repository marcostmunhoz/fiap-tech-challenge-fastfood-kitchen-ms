import {
  AbstractEntity,
  MoneyValueObject,
  PartialProductData,
  ProductCategoryEnum,
  ProductCodeValueObject,
  ProductData,
  ProductDescriptionValueObject,
  ProductNameValueObject,
} from '@marcostmunhoz/fastfood-libs';

export type PartialProductEntityProps = PartialProductData;

export type CompleteProductEntityProps = ProductData;

export class ProductEntity extends AbstractEntity<CompleteProductEntityProps> {
  public get code(): ProductCodeValueObject {
    return this.props.code;
  }

  public get name(): ProductNameValueObject {
    return this.props.name;
  }

  public get description(): ProductDescriptionValueObject {
    return this.props.description;
  }

  public get category(): ProductCategoryEnum {
    return this.props.category;
  }

  public get price(): MoneyValueObject {
    return this.props.price;
  }

  public setCode(code: ProductCodeValueObject): ProductEntity {
    this.props.code = code;
    this.markAsUpdated();

    return this;
  }

  public setName(name: ProductNameValueObject): ProductEntity {
    this.props.name = name;
    this.markAsUpdated();

    return this;
  }

  public setDescription(
    description: ProductDescriptionValueObject,
  ): ProductEntity {
    this.props.description = description;
    this.markAsUpdated();

    return this;
  }

  public setCategory(category: ProductCategoryEnum): ProductEntity {
    this.props.category = category;
    this.markAsUpdated();

    return this;
  }

  public setPrice(price: MoneyValueObject): ProductEntity {
    this.props.price = price;
    this.markAsUpdated();

    return this;
  }
}
