import { Router } from "express";
import seaShipmentControllers from "../controllers/sea-shipment.controllers.js";
import { CreateSeaShipmentDto } from "../dto/request/sea-shipment.dto.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";

const router = Router();

router.post("/", validationMiddleware(CreateSeaShipmentDto), seaShipmentControllers.createSeaShipment);

export default router;
