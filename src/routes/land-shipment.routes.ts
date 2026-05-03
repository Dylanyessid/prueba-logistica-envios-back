import { Router } from "express";
import landShipmentControllers from "../controllers/land-shipment.controllers.js";
import { CreateLandShipmentDto } from "../dto/request/land-shipment.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";

const router = Router();

router.get("/", authMiddleware, landShipmentControllers.getAllLandShipments);
router.get("/:id", authMiddleware, landShipmentControllers.getLandShipmentById);
router.post("/", authMiddleware, validationMiddleware(CreateLandShipmentDto), landShipmentControllers.createLandShipment);

export default router;
