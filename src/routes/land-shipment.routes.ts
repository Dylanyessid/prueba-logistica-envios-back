import { Router } from "express";
import landShipmentControllers from "../controllers/land-shipment.controllers.js";
import { CreateLandShipmentDto } from "../dto/request/land-shipment.dto.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";

const router = Router();

router.post("/", validationMiddleware(CreateLandShipmentDto), landShipmentControllers.createLandShipment);

export default router;
