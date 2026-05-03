import { Router } from "express";
import seaShipmentControllers from "../controllers/sea-shipment.controllers.js";
import { CreateSeaShipmentDto, UpdateSeaShipmentDto } from "../dto/request/sea-shipment.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSeaShipmentDto:
 *       type: object
 *       required:
 *         - clientId
 *         - productId
 *         - destinationPortId
 *         - productQuantity
 *         - shippingPrice
 *         - fleetNumber
 *         - trackingNumber
 *         - registrationDate
 *         - deliveryDate
 *       properties:
 *         clientId:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 2
 *         destinationPortId:
 *           type: integer
 *           example: 3
 *         productQuantity:
 *           type: integer
 *           example: 20
 *         shippingPrice:
 *           type: number
 *           format: float
 *           example: 250000
 *         fleetNumber:
 *           type: string
 *           example: ABC1234D
 *         trackingNumber:
 *           type: string
 *           example: A1B2C3D4E5
 *         registrationDate:
 *           type: string
 *           format: date
 *           example: 2026-05-03
 *         deliveryDate:
 *           type: string
 *           format: date
 *           example: 2026-05-10
 *     UpdateSeaShipmentDto:
 *       type: object
 *       properties:
 *         clientId:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 2
 *         destinationPortId:
 *           type: integer
 *           example: 3
 *         productQuantity:
 *           type: integer
 *           example: 15
 *         shippingPrice:
 *           type: number
 *           format: float
 *           example: 200000
 *         fleetNumber:
 *           type: string
 *           example: XYZ9876A
 *         trackingNumber:
 *           type: string
 *           example: NEW1N2W3N4W
 *         registrationDate:
 *           type: string
 *           format: date
 *           example: 2026-05-01
 *         deliveryDate:
 *           type: string
 *           format: date
 *           example: 2026-05-08
 *     SeaShipment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         clientId:
 *           type: integer
 *           example: 1
 *         clientName:
 *           type: string
 *           example: Juan Perez
 *         clientDocument:
 *           type: string
 *           example: "123456789"
 *         productId:
 *           type: integer
 *           example: 2
 *         productName:
 *           type: string
 *           example: Contenedor
 *         destinationPortId:
 *           type: integer
 *           example: 3
 *         destinationPortName:
 *           type: string
 *           example: Puerto Cartagena
 *         productQuantity:
 *           type: integer
 *           example: 20
 *         shippingPrice:
 *           type: number
 *           format: float
 *           example: 250000
 *         discountPercentage:
 *           type: number
 *           format: float
 *           example: 3
 *         discountAmount:
 *           type: number
 *           format: float
 *           example: 7500
 *         finalPrice:
 *           type: number
 *           format: float
 *           example: 242500
 *         fleetNumber:
 *           type: string
 *           example: ABC1234D
 *         trackingNumber:
 *           type: string
 *           example: A1B2C3D4E5
 *         registrationDate:
 *           type: string
 *           format: date
 *         deliveryDate:
 *           type: string
 *           format: date
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
 * /api/v1/sea-shipments:
 *   get:
 *     tags:
 *       - Sea Shipments
 *     summary: Listar envíos marítimos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de envíos marítimos
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
 *                     $ref: '#/components/schemas/SeaShipment'
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, seaShipmentControllers.getAllSeaShipments);

/**
 * @swagger
 * /api/v1/sea-shipments/{id}:
 *   get:
 *     tags:
 *       - Sea Shipments
 *     summary: Obtener un envío marítimo por id
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
 *         description: Envío marítimo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SeaShipment'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío marítimo no encontrado
 */
router.get("/:id", authMiddleware, seaShipmentControllers.getSeaShipmentById);

/**
 * @swagger
 * /api/v1/sea-shipments/{id}:
 *   delete:
 *     tags:
 *       - Sea Shipments
 *     summary: Eliminar lógicamente un envío marítimo
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
 *         description: Envío marítimo eliminado lógicamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío marítimo no encontrado
 */
router.delete("/:id", authMiddleware, seaShipmentControllers.deleteSeaShipment);

/**
 * @swagger
 * /api/v1/sea-shipments:
 *   post:
 *     tags:
 *       - Sea Shipments
 *     summary: Crear un envío marítimo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSeaShipmentDto'
 *     responses:
 *       201:
 *         description: Envío marítimo creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente, producto o puerto no encontrado
 *       409:
 *         description: Número de guía duplicado
 */
router.post("/", authMiddleware, validationMiddleware(CreateSeaShipmentDto), seaShipmentControllers.createSeaShipment);

/**
 * @swagger
 * /api/v1/sea-shipments/{id}:
 *   patch:
 *     tags:
 *       - Sea Shipments
 *     summary: Editar un envío marítimo
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
 *             $ref: '#/components/schemas/UpdateSeaShipmentDto'
 *     responses:
 *       200:
 *         description: Envío marítimo actualizado exitosamente
 *       400:
 *         description: Datos inválidos o fecha de entrega inválida
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío, cliente, producto o puerto no encontrado
 *       409:
 *         description: Número de guía duplicado
 */
router.patch("/:id", authMiddleware, validationMiddleware(UpdateSeaShipmentDto), seaShipmentControllers.updateSeaShipment);

export default router;
