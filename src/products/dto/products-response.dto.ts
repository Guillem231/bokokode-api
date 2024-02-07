import { Expose } from 'class-transformer';
import { ProductDto } from './product.dto';

export class ProductsResponseDto {
  @Expose()
  data: {
    current_page: number;
    data: ProductDto[];

    next_page_url: string | null;

    path: string;

    per_page: number;

    prev_page_url: string | null;

    to: number;

    total: number;
    total_pages: number;
    total_categories: string[];
  };
}
