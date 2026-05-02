import type { Request, Response } from "express";
import warehouseService from "../services/warehouse.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js";
import { getErrorStatusCode } from "../utils/errrors.js";

export default {
  async getAllWarehouses(req: Request, res: Response) {
    try {
      const result = await warehouseService.getAllWarehouses();

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

  async getWarehouseById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await warehouseService.getWarehouseById(id);

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

  async createWarehouse(req: Request, res: Response) {
    try {
      const result = await warehouseService.createWarehouse(req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Warehouse created successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async updateWarehouse(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await warehouseService.updateWarehouse(id, req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Warehouse updated successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async deleteWarehouse(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await warehouseService.deleteWarehouse(id);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Warehouse deleted successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },
};
