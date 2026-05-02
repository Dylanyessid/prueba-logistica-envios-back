import { AppDataSource } from "../config/db.js";
import type { CreateProductDto, UpdateProductDto } from "../dto/request/product.dto.js";
import { Product } from "../models/product.js";
import { ErrorType } from "../utils/errrors.js";
import { fail, ok } from "../utils/result.js";

const productRepository = AppDataSource.getRepository(Product);

export default {
  async getAllProducts() {
    try {
      const products = await productRepository.find({
        order: { id: "ASC" },
      });

      return ok(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return fail("Error fetching products", ErrorType.INTERNAL_ERROR);
    }
  },

  async getProductById(id: number) {
    try {
      const product = await productRepository.findOne({ where: { id } });

      if (!product) {
        return fail("Product not found", ErrorType.NOT_FOUND);
      }

      return ok(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return fail("Error fetching product", ErrorType.INTERNAL_ERROR);
    }
  },

  async createProduct(data: CreateProductDto) {
    try {
      const product = productRepository.create(data);
      await productRepository.save(product);

      return ok(product);
    } catch (error) {
      console.error("Error creating product:", error);
      return fail("Error creating product", ErrorType.INTERNAL_ERROR);
    }
  },

  async updateProduct(id: number, data: UpdateProductDto) {
    try {
      const existingProduct = await productRepository.findOne({ where: { id } });

      if (!existingProduct) {
        return fail("Product not found", ErrorType.NOT_FOUND);
      }

      const updatedProduct = productRepository.merge(existingProduct, data);
      await productRepository.save(updatedProduct);

      return ok(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      return fail("Error updating product", ErrorType.INTERNAL_ERROR);
    }
  },

  async deleteProduct(id: number) {
    try {
      const product = await productRepository.findOne({ where: { id } });

      if (!product) {
        return fail("Product not found", ErrorType.NOT_FOUND);
      }

      await productRepository.softRemove(product);
      return ok(product);
    } catch (error) {
      console.error("Error deleting product:", error);
      return fail("Error deleting product", ErrorType.INTERNAL_ERROR);
    }
  },
};
