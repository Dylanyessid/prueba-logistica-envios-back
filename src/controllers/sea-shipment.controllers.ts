import type { Request, Response } from "express";
import seaShipmentService from "../services/sea-shipment.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js";
import { getErrorStatusCode } from "../utils/errrors.js";

export default {
  async getAllSeaShipments(req: Request, res: Response) {
    try {
      const result = await seaShipmentService.getAllSeaShipments();

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

  async getSeaShipmentById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await seaShipmentService.getSeaShipmentById(id);

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

  async deleteSeaShipment(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await seaShipmentService.deleteSeaShipment(id);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Sea shipment deleted successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async createSeaShipment(req: Request, res: Response) {
    try {
      const result = await seaShipmentService.createSeaShipment(req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Sea shipment created successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },
};
