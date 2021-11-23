import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from './product.models'

@Injectable()
export class ProductService {
  private products: Product[] = []
  insertProduct(title: string, description: string, price: number) {
    const productId = String(new Date().getTime())
    const newProduct = new Product(productId, title, description, price)
    this.products.push(newProduct)
    return productId
  }
  getProducts() {
    return [...this.products]
  }

  getSingleProduct(productId: string) {
    const [product] = this.findProduct(productId)
    return { ...product }
  }
  // Update product
  updateProduct(productId: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(productId)
    const updateProduct = { ...product }
    console.log(`index`, index)
    console.log(`product`, product)
    console.log(`updateProduct`, updateProduct)
    console.log(`title`, title)
    if (title) {
      updateProduct.title = title
    }
    if (description) {
      updateProduct.description = description
    }
    if (price) {
      updateProduct.price = price
    }
    console.log(`updateProduct last`, updateProduct)
    this.products[index] = updateProduct
  }
  // Delete product servive
  deleteProduct(productId: string) {
    const [product, index] = this.findProduct(productId)
    this.products.splice(index, 1)
  }
  // Only call from service
  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === productId)
    const product = this.products[productIndex]
    if (!product) {
      throw new NotFoundException('Could not find product.')
    }
    return [product, productIndex]
  }

}