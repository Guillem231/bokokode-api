// product.dto.ts
import { Expose, Type } from 'class-transformer';
import { ImageDto } from './image.dto';

export class ProductDto {
  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  category: string;

  @Expose()
  price: number;

  @Expose()
  currency: string;

  @Expose()
  @Type(() => ImageDto)
  image: ImageDto;

  @Expose()
  bestseller: boolean;

  @Expose()
  featured: boolean;

  @Expose()
  description: string;

  @Expose()
  @Type(() => ProductDto)
  people_also_buy: ProductDto[];

  @Expose()
  updated_at: string;

  @Expose()
  created_at: string;
}
