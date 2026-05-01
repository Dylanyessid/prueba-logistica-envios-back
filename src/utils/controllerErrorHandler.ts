import type { Response } from "express";

export const handleHttpError = (res: Response, error: any, message = "Error interno del servidor") => {
  console.error(`[ERROR]: ${error instanceof Error ? error.message : error}`);
  res.status(500).json({
    success: false,
    message,
  });
};