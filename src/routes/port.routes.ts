import { Router } from "express";
import portControllers from "../controllers/port.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreatePortDto, UpdatePortDto } from "../dto/request/port.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePortDto:
 *       type: object
 *       required:
 *         - name
 *         - country
 *         - city
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           example: Puerto Cartagena
 *         country:
 *           type: string
 *           example: Colombia
 *         city:
 *           type: string
 *           example: Cartagena
 *         type:
 *           type: string
 *           enum: [national, international]
 *           example: international
 *     UpdatePortDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Puerto Santa Marta
 *         country:
 *           type: string
 *           example: Colombia
 *         city:
 *           type: string
 *           example: Santa Marta
 *         type:
 *           type: string
 *           enum: [national, international]
 *           example: national
 *     Port:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Puerto Cartagena
 *         country:
 *           type: string
 *           example: Colombia
 *         city:
 *           type: string
 *           example: Cartagena
 *         type:
 *           type: string
 *           example: international
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
 */

/**
 * @swagger
 * /api/v1/ports:
 *   get:
 *     tags:
 *       - Ports
 *     summary: Listar puertos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de puertos
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
 *                     $ref: '#/components/schemas/Port'
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, portControllers.getAllPorts);

/**
 * @swagger
 * /api/v1/ports/{id}:
 *   get:
 *     tags:
 *       - Ports
 *     summary: Obtener un puerto por id
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
 *         description: Puerto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Port'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Puerto no encontrado
 */
router.get("/:id", authMiddleware, portControllers.getPortById);

/**
 * @swagger
 * /api/v1/ports:
 *   post:
 *     tags:
 *       - Ports
 *     summary: Crear un puerto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePortDto'
 *     responses:
 *       201:
 *         description: Puerto creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       409:
 *         description: Puerto ya existe
 */
router.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(CreatePortDto), portControllers.createPort);

/**
 * @swagger
 * /api/v1/ports/{id}:
 *   patch:
 *     tags:
 *       - Ports
 *     summary: Editar un puerto
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
 *             $ref: '#/components/schemas/UpdatePortDto'
 *     responses:
 *       200:
 *         description: Puerto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Puerto no encontrado
 */
router.patch("/:id", authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdatePortDto), portControllers.updatePort);

/**
 * @swagger
 * /api/v1/ports/{id}:
 *   delete:
 *     tags:
 *       - Ports
 *     summary: Eliminar lógicamente un puerto
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
 *         description: Puerto eliminado lógicamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Puerto no encontrado
 */
router.delete("/:id", authMiddleware, roleMiddleware("admin"), portControllers.deletePort);

export default router;
