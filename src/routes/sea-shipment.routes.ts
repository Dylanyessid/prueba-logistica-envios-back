import { Router } from "express";
import seaShipmentControllers from "../controllers/sea-shipment.controllers.js";
import { CreateSeaShipmentDto } from "../dto/request/sea-shipment.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";

const router = Router();

router.get("/", authMiddleware, seaShipmentControllers.getAllSeaShipments);
router.get("/:id", authMiddleware, seaShipmentControllers.getSeaShipmentById);
router.post("/", authMiddleware, validationMiddleware(CreateSeaShipmentDto), seaShipmentControllers.createSeaShipment);

export default router;
