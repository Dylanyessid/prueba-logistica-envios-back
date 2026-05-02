import { Router } from "express";
import productControllers from "../controllers/product.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateProductDto, UpdateProductDto } from "../dto/request/product.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

router.get("/",authMiddleware, productControllers.getAllProducts);
router.get("/:id",authMiddleware, productControllers.getProductById);
router.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(CreateProductDto), productControllers.createProduct);
router.patch("/:id",authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdateProductDto), productControllers.updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), productControllers.deleteProduct);

export default router;
