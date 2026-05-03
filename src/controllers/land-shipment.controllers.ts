import type { Request, Response } from "express";
import landShipmentService from "../services/land-shipment.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js";
import { getErrorStatusCode } from "../utils/errrors.js";

export default {
  async getAllLandShipments(req: Request, res: Response) {
    try {
      const result = await landShipmentService.getAllLandShipments();

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

  async getLandShipmentById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await landShipmentService.getLandShipmentById(id);

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

  async deleteLandShipment(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await landShipmentService.deleteLandShipment(id);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Land shipment deleted successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async createLandShipment(req: Request, res: Response) {
    try {
      const result = await landShipmentService.createLandShipment(req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Land shipment created successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },

  async updateLandShipment(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await landShipmentService.updateLandShipment(id, req.body);

      if (!result.success) {
        const statusCode = getErrorStatusCode(result.errorType);
        return res.status(statusCode).json({
          success: false,
          message: result.error,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Land shipment updated successfully",
        data: result.value,
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  },
};
