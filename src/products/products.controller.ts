import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')

export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productService.insertProduct(prodTitle, prodDescription, prodPrice)
    return { id: generatedId }
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productService.getSingleProduct(productId)
  }
  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateProduct(productId, prodTitle, prodDescription, prodPrice)
    return null
  }
  // Remove product
  @Delete(':id')
  removeProduct(@Param('id') productId: string) {
    this.productService.deleteProduct(productId)
    return null
  }
}