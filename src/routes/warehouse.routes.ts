import { Router } from "express";
import warehouseControllers from "../controllers/warehouse.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateWarehouseDto, UpdateWarehouseDto } from "../dto/request/warehouse.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

router.get("/", authMiddleware, warehouseControllers.getAllWarehouses);
router.get("/:id", authMiddleware, warehouseControllers.getWarehouseById);
router.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(CreateWarehouseDto), warehouseControllers.createWarehouse);
router.patch("/:id", authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdateWarehouseDto), warehouseControllers.updateWarehouse);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), warehouseControllers.deleteWarehouse);

export default router;
