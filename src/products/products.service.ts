import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Product } from './product.models'

@Injectable()
export class ProductService {
  private products: Product[] = []
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price })

    const result = await newProduct.save()
    return result.id as string
  }
  async getProducts() {
    const products = await this.productModel.find()
    return products
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId)
    return product
  }
  // Update product
  async updateProduct(productId: string, title: string, description: string, price: number) {
    let updateProduct = await this.findProduct(productId)

    if (title) {
      updateProduct.title = title
    }
    if (description) {
      updateProduct.description = description
    }
    if (price) {
      updateProduct.price = price
    }
    updateProduct.save()

  }
  // Delete product servive
  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({ _id: productId }).exec()
    console.log(`result in the delete`, result)
    if (result.deletedCount === 0) throw new NotFoundException('Could not find product.')

  }
  // Only call from service
  private async findProduct(productId: string): Promise<Product> {
    let product = null
    try {
      product = await this.productModel.findById(productId)
    } catch (error) {
      throw new NotFoundException('Could not find product.')
    }
    if (!product) {
      throw new NotFoundException('Could not find product.')
    }
    return product
  }

}