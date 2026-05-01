import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateUserDto } from "../dto/request/user.dto.js";

const router = Router();

router.post('/', validationMiddleware(CreateUserDto) ,userControllers.createUser)

export default router;