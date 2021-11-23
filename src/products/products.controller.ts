import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')

export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(prodTitle, prodDescription, prodPrice)
    return { id: generatedId }
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getProducts()
    return products
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    return await this.productService.getSingleProduct(productId)
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productService.updateProduct(productId, prodTitle, prodDescription, prodPrice)
    return null
  }
  // Remove product
  @Delete(':id')
  async removeProduct(@Param('id') productId: string) {
    await this.productService.deleteProduct(productId)
    return null
  }
}