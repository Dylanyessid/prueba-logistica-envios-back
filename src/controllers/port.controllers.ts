import type { Request, Response } from "express";
import portService from "../services/port.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js";
import { getErrorStatusCode } from "../utils/errrors.js";

export default {
  async getAllPorts(req: Request, res: Response) {
    try {
      const result = await portService.getAllPorts();

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

  async getPortById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await portService.getPortById(id);

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

  async createPort(req: Request, res: Response) {
    try {
      const result = await portService.createPort(req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Port created successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async updatePort(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await portService.updatePort(id, req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Port updated successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async deletePort(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await portService.deletePort(id);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Port deleted successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },
};
