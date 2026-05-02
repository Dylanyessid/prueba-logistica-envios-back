import type { Request, Response } from "express";
import seaShipmentService from "../services/sea-shipment.service.js";
import { handleHttpError } from "../utils/controllerErrorHandler.js";
import { getErrorStatusCode } from "../utils/errrors.js";

export default {
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
