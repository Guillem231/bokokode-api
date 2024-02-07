import * as fs from 'fs';
import * as path from 'path';
import { ProductDto } from './dto/product.dto';
import { SearchOptions } from './dto/search.dto';
import { ProductsResponseDto } from './dto/products-response.dto';

export class ProductsUtils {
  static filterProducts(
    allProducts: ProductDto[],
    options: SearchOptions,
  ): ProductDto[] {
    return options.categories
      ? allProducts.filter((product) =>
          options.categories
            .map((c) => c.toLowerCase())
            .includes(product.category.toLowerCase()),
        )
      : allProducts;
  }

  static sortProducts(
    allProducts: ProductDto[],
    options: SearchOptions,
  ): ProductDto[] {
    if (options.sort) {
      return allProducts.sort((a, b) => {
        if (options.sort.key === 'price') {
          return options.sort.type === 'ASC'
            ? a.price - b.price
            : b.price - a.price;
        } else if (options.sort.key === 'name') {
          return options.sort.type === 'ASC'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
      });
    }
    return allProducts;
  }
  static getUniqueCategories(products: ProductDto[]): string[] {
    const categories = new Set<string>();
    products.forEach((product) => {
      const capitalizedCategory =
        product.category.charAt(0).toUpperCase() + product.category.slice(1);
      categories.add(capitalizedCategory);
    });
    return Array.from(categories);
  }
  static paginateProducts(
    products: ProductDto[],
    page: number,
    perPage: number,
  ): ProductDto[] {
    //if page has featured products, return 7 products
    //instead of 6 (because one is shown on the top of the page)
    const start = (page - 1) * perPage;
    let end = start + perPage;

    const pageProducts = products.slice(start, end);
    const hasFeatured = pageProducts.some((product) => product.featured);

    if (hasFeatured) {
      end = start + 7;
    }

    return products.slice(start, end);
  }
  static buildProductsResponse(
    page: number,
    products: ProductDto[],
    total: number,
    perPage: number,
    totalPages: number,
    categories: string[],
  ): ProductsResponseDto {
    const nextPageUrl =
      page < totalPages
        ? `localhost:3000/api/products?page=${Number(page) + 1}`
        : null;
    const prevPageUrl =
      page > 1 ? `localhost:3000/api/products?page=${Number(page) - 1}` : null;

    return {
      data: {
        current_page: page,
        data: products,
        next_page_url: nextPageUrl,
        path: 'localhost:3000/api/products/api/products',
        per_page: perPage,
        prev_page_url: prevPageUrl,
        to: Math.min((page - 1) * perPage + perPage, total),
        total: total,
        total_pages: totalPages,
        total_categories: categories,
      },
    };
  }

  static getAllProducts(dataPath: string): ProductDto[] {
    try {
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  }
}
