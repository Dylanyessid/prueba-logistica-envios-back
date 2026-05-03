import { Router } from "express";
import productControllers from "../controllers/product.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateProductDto, UpdateProductDto } from "../dto/request/product.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

router.get("/",authMiddleware, productControllers.getAllProducts);
router.get("/:id",authMiddleware, productControllers.getProductById);
router.post("/", authMiddleware, validationMiddleware(CreateProductDto), productControllers.createProduct);
router.patch("/:id",authMiddleware,  validationMiddleware(UpdateProductDto), productControllers.updateProduct);
router.delete("/:id", authMiddleware, productControllers.deleteProduct);

export default router;
