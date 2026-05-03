import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateClientUserDto, LoginUserDto, UpdateClientUserDto } from "../dto/request/user.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: cliente@email.com
 *         password:
 *           type: string
 *           example: secret123
 *     CreateClientUserDto:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *         - phone
 *         - document
 *         - address
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: cliente@email.com
 *         name:
 *           type: string
 *           example: Juan Perez
 *         password:
 *           type: string
 *           example: secret123
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "3001234567"
 *         document:
 *           type: string
 *           example: "123456789"
 *         address:
 *           type: string
 *           nullable: true
 *           example: Calle 123 #45-67
 *     UpdateClientUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: nuevo@email.com
 *         name:
 *           type: string
 *           example: Juan Actualizado
 *         password:
 *           type: string
 *           example: newsecret123
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "3001234567"
 *         document:
 *           type: string
 *           example: "123456789"
 *         address:
 *           type: string
 *           nullable: true
 *           example: Carrera 10 #20-30
 *     ClientUser:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         clientId:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Juan Perez
 *         email:
 *           type: string
 *           format: email
 *           example: cliente@email.com
 *         role:
 *           type: string
 *           example: client
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "3001234567"
 *         document:
 *           type: string
 *           example: "123456789"
 *         address:
 *           type: string
 *           nullable: true
 *           example: Calle 123 #45-67
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     SuccessMessage:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Operation completed successfully
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Not authorized
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login de usuario cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserDto'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 data:
 *                   $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Credenciales inválidas
 *       404:
 *         description: Perfil cliente no encontrado
 */
router.post('/login', validationMiddleware(LoginUserDto) ,userControllers.loginUser)

/**
 * @swagger
 * /api/v1/users/clients:
 *   get:
 *     tags:
 *       - Users
 *     summary: Listar usuarios cliente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClientUser'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 */
router.get('/clients', authMiddleware, roleMiddleware("admin"), userControllers.getClientUsers)

/**
 * @swagger
 * /api/v1/users/clients/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener un usuario cliente por id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ClientUser'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Usuario cliente no encontrado
 */
router.get('/clients/:id', authMiddleware, roleMiddleware("admin"), userControllers.getClientUserById)

/**
 * @swagger
 * /api/v1/users/clients:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear un usuario cliente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientUserDto'
 *     responses:
 *       201:
 *         description: Usuario cliente creado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       409:
 *         description: Usuario o documento ya existe
 */
router.post('/clients', authMiddleware, roleMiddleware("admin"), validationMiddleware(CreateClientUserDto) ,userControllers.createClientUser)

/**
 * @swagger
 * /api/v1/users/clients/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Editar un usuario cliente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientUserDto'
 *     responses:
 *       200:
 *         description: Usuario cliente actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Usuario cliente no encontrado
 *       409:
 *         description: Email o documento ya existe
 */
router.patch('/clients/:id', authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdateClientUserDto), userControllers.updateClientUser)

/**
 * @swagger
 * /api/v1/users/clients/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar lógicamente un usuario cliente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario cliente eliminado lógicamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Usuario cliente no encontrado
 */
router.delete('/clients/:id', authMiddleware, roleMiddleware("admin"), userControllers.deleteClientUser)

export default router;
