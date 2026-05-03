import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateClientUserDto, LoginUserDto, UpdateClientUserDto } from "../dto/request/user.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

router.post('/login', validationMiddleware(LoginUserDto) ,userControllers.loginUser)
router.get('/clients', authMiddleware, roleMiddleware("admin"), userControllers.getClientUsers)
router.get('/clients/:id', authMiddleware, roleMiddleware("admin"), userControllers.getClientUserById)
router.post('/clients', authMiddleware, roleMiddleware("admin"), validationMiddleware(CreateClientUserDto) ,userControllers.createClientUser)
router.patch('/clients/:id', authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdateClientUserDto), userControllers.updateClientUser)
router.delete('/clients/:id', authMiddleware, roleMiddleware("admin"), userControllers.deleteClientUser)

export default router;
