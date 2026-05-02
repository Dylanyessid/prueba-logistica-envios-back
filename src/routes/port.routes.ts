import { Router } from "express";
import portControllers from "../controllers/port.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreatePortDto, UpdatePortDto } from "../dto/request/port.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

router.get("/", authMiddleware, portControllers.getAllPorts);
router.get("/:id", authMiddleware, portControllers.getPortById);
router.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(CreatePortDto), portControllers.createPort);
router.patch("/:id", authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdatePortDto), portControllers.updatePort);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), portControllers.deletePort);

export default router;
