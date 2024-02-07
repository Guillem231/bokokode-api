import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsResponseDto } from './dto/products-response.dto';
import { ProductsService } from './products.service';
import { SearchOptions } from './dto/search.dto';
import { ProductDto } from './dto/product.dto';
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsDataService: ProductsService) {}

  @Post()
  getProducts(
    @Query('page') page: number,
    @Body() options: SearchOptions,
  ): ProductsResponseDto {
    return this.productsDataService.getProducts(page, options);
  }

  @Get(':id')
  getProductById(@Param('id') id: string): ProductDto {
    return this.productsDataService.getProductById(id);
  }
}
