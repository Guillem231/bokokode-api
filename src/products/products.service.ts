import * as fs from 'fs';
import * as path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsResponseDto } from './dto/products-response.dto';
import { ProductDto } from './dto/product.dto';
import { SearchOptions } from './dto/search.dto';
import { ProductsUtils } from './products.utils';

@Injectable()
export class ProductsService {
  private readonly dataPath: string;
  private readonly perPage: number = 6;

  constructor() {
    const basePath = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
    this.dataPath = path.resolve(basePath, 'products/data/products-data.json');
  }

  getProducts(page: number = 1, options: SearchOptions): ProductsResponseDto {
    const allProducts = ProductsUtils.getAllProducts(this.dataPath);
    const filteredProducts = ProductsUtils.filterProducts(allProducts, options);

    const sortedProducts = ProductsUtils.sortProducts(
      filteredProducts,
      options,
    );
    const total = sortedProducts.length;
    const totalPages = Math.ceil(total / this.perPage);
    const paginatedProducts = ProductsUtils.paginateProducts(
      sortedProducts,
      page,
      this.perPage,
    );
    const categories = ProductsUtils.getUniqueCategories(allProducts);

    return ProductsUtils.buildProductsResponse(
      page,
      paginatedProducts,
      total,
      this.perPage,
      totalPages,
      categories,
    );
  }

  getProductById(id: string): ProductDto {
    const allProducts = ProductsUtils.getAllProducts(this.dataPath);
    const product = allProducts.find((product) => product._id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
