import type { Request, Response } from "express";
import productService from "../services/product.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js";
import { getErrorStatusCode } from "../utils/errrors.js";

export default {
  async getAllProducts(req: Request, res: Response) {
    try {
      const result = await productService.getAllProducts();

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await productService.getProductById(id);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const result = await productService.createProduct(req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await productService.updateProduct(id, req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await productService.deleteProduct(id);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },
};
