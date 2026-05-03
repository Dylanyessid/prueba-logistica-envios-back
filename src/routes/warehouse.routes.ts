import { Router } from "express";
import warehouseControllers from "../controllers/warehouse.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateWarehouseDto, UpdateWarehouseDto } from "../dto/request/warehouse.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateWarehouseDto:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - country
 *         - city
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           example: Bodega Principal
 *         address:
 *           type: string
 *           example: Calle 123 #45-67
 *         country:
 *           type: string
 *           example: Colombia
 *         city:
 *           type: string
 *           example: Bogota
 *         capacity:
 *           type: integer
 *           example: 1000
 *     UpdateWarehouseDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Bodega Norte
 *         address:
 *           type: string
 *           example: Carrera 10 #20-30
 *         country:
 *           type: string
 *           example: Colombia
 *         city:
 *           type: string
 *           example: Medellin
 *         capacity:
 *           type: integer
 *           example: 1500
 *     Warehouse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Bodega Principal
 *         address:
 *           type: string
 *           example: Calle 123 #45-67
 *         country:
 *           type: string
 *           example: Colombia
 *         city:
 *           type: string
 *           example: Bogota
 *         capacity:
 *           type: integer
 *           example: 1000
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
 * /api/v1/warehouses:
 *   get:
 *     tags:
 *       - Warehouses
 *     summary: Listar bodegas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bodegas
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
 *                     $ref: '#/components/schemas/Warehouse'
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, warehouseControllers.getAllWarehouses);

/**
 * @swagger
 * /api/v1/warehouses/{id}:
 *   get:
 *     tags:
 *       - Warehouses
 *     summary: Obtener una bodega por id
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
 *         description: Bodega encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Warehouse'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Bodega no encontrada
 */
router.get("/:id", authMiddleware, warehouseControllers.getWarehouseById);

/**
 * @swagger
 * /api/v1/warehouses:
 *   post:
 *     tags:
 *       - Warehouses
 *     summary: Crear una bodega
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWarehouseDto'
 *     responses:
 *       201:
 *         description: Bodega creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       409:
 *         description: Bodega ya existe
 */
router.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(CreateWarehouseDto), warehouseControllers.createWarehouse);

/**
 * @swagger
 * /api/v1/warehouses/{id}:
 *   patch:
 *     tags:
 *       - Warehouses
 *     summary: Editar una bodega
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
 *             $ref: '#/components/schemas/UpdateWarehouseDto'
 *     responses:
 *       200:
 *         description: Bodega actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Bodega no encontrada
 */
router.patch("/:id", authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdateWarehouseDto), warehouseControllers.updateWarehouse);

/**
 * @swagger
 * /api/v1/warehouses/{id}:
 *   delete:
 *     tags:
 *       - Warehouses
 *     summary: Eliminar lógicamente una bodega
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
 *         description: Bodega eliminada lógicamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Bodega no encontrada
 */
router.delete("/:id", authMiddleware, roleMiddleware("admin"), warehouseControllers.deleteWarehouse);

export default router;
