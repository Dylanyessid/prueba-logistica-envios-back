import { Router } from "express";
import landShipmentControllers from "../controllers/land-shipment.controllers.js";
import { CreateLandShipmentDto, UpdateLandShipmentDto } from "../dto/request/land-shipment.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateLandShipmentDto:
 *       type: object
 *       required:
 *         - clientId
 *         - productId
 *         - destinationWarehouseId
 *         - productQuantity
 *         - shippingPrice
 *         - vehiclePlate
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
 *         destinationWarehouseId:
 *           type: integer
 *           example: 3
 *         productQuantity:
 *           type: integer
 *           example: 15
 *         shippingPrice:
 *           type: number
 *           format: float
 *           example: 100000
 *         vehiclePlate:
 *           type: string
 *           example: ABC123
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
 *           example: 2026-05-05
 *     UpdateLandShipmentDto:
 *       type: object
 *       properties:
 *         clientId:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 2
 *         destinationWarehouseId:
 *           type: integer
 *           example: 3
 *         productQuantity:
 *           type: integer
 *           example: 20
 *         shippingPrice:
 *           type: number
 *           format: float
 *           example: 120000
 *         vehiclePlate:
 *           type: string
 *           example: XYZ987
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
 *           example: 2026-05-06
 *     LandShipment:
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
 *           example: Televisor
 *         destinationWarehouseId:
 *           type: integer
 *           example: 3
 *         destinationWarehouseName:
 *           type: string
 *           example: Bodega Bogota
 *         productQuantity:
 *           type: integer
 *           example: 15
 *         shippingPrice:
 *           type: number
 *           format: float
 *           example: 100000
 *         discountPercentage:
 *           type: number
 *           format: float
 *           example: 5
 *         discountAmount:
 *           type: number
 *           format: float
 *           example: 5000
 *         finalPrice:
 *           type: number
 *           format: float
 *           example: 95000
 *         vehiclePlate:
 *           type: string
 *           example: ABC123
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
 * /api/v1/land-shipments:
 *   get:
 *     tags:
 *       - Land Shipments
 *     summary: Listar envíos terrestres
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de envíos terrestres
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
 *                     $ref: '#/components/schemas/LandShipment'
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, landShipmentControllers.getAllLandShipments);

/**
 * @swagger
 * /api/v1/land-shipments/{id}:
 *   get:
 *     tags:
 *       - Land Shipments
 *     summary: Obtener un envío terrestre por id
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
 *         description: Envío terrestre encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/LandShipment'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío terrestre no encontrado
 */
router.get("/:id", authMiddleware, landShipmentControllers.getLandShipmentById);

/**
 * @swagger
 * /api/v1/land-shipments/{id}:
 *   delete:
 *     tags:
 *       - Land Shipments
 *     summary: Eliminar lógicamente un envío terrestre
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
 *         description: Envío terrestre eliminado lógicamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío terrestre no encontrado
 */
router.delete("/:id", authMiddleware, landShipmentControllers.deleteLandShipment);

/**
 * @swagger
 * /api/v1/land-shipments:
 *   post:
 *     tags:
 *       - Land Shipments
 *     summary: Crear un envío terrestre
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLandShipmentDto'
 *     responses:
 *       201:
 *         description: Envío terrestre creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente, producto o bodega no encontrado
 *       409:
 *         description: Número de guía duplicado
 */
router.post("/", authMiddleware, validationMiddleware(CreateLandShipmentDto), landShipmentControllers.createLandShipment);

/**
 * @swagger
 * /api/v1/land-shipments/{id}:
 *   patch:
 *     tags:
 *       - Land Shipments
 *     summary: Editar un envío terrestre
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
 *             $ref: '#/components/schemas/UpdateLandShipmentDto'
 *     responses:
 *       200:
 *         description: Envío terrestre actualizado exitosamente
 *       400:
 *         description: Datos inválidos o fecha de entrega inválida
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Envío, cliente, producto o bodega no encontrada
 *       409:
 *         description: Número de guía duplicado
 */
router.patch("/:id", authMiddleware, validationMiddleware(UpdateLandShipmentDto), landShipmentControllers.updateLandShipment);

export default router;
