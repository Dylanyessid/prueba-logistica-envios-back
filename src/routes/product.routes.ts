import { Router } from "express";
import productControllers from "../controllers/product.controllers.js";
import { validationMiddleware } from "../middlewares/dtoValidation.js";
import { CreateProductDto, UpdateProductDto } from "../dto/request/product.dto.js";
import { authMiddleware } from "../middlewares/jwtValidation.js";
import { roleMiddleware } from "../middlewares/roleValidation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProductDto:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           example: Contenedor 40 pies
 *         description:
 *           type: string
 *           example: Contenedor estándar de 40 pies para carga pesada
 *     UpdateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Contenedor 20 pies
 *         description:
 *           type: string
 *           example: Contenedor estándar de 20 pies
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Contenedor 40 pies
 *         description:
 *           type: string
 *           example: Contenedor estándar de 40 pies para carga pesada
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
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Listar productos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         description: No autorizado
 */
router.get("/",authMiddleware, productControllers.getAllProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener un producto por id
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
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id",authMiddleware, productControllers.getProductById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crear un producto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       409:
 *         description: Producto ya existe
 */
router.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(CreateProductDto), productControllers.createProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Editar un producto
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
 *             $ref: '#/components/schemas/UpdateProductDto'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Producto no encontrado
 */
router.patch("/:id",authMiddleware, roleMiddleware("admin"), validationMiddleware(UpdateProductDto), productControllers.updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Eliminar lógicamente un producto
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
 *         description: Producto eliminado lógicamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso solo para admin
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", authMiddleware, roleMiddleware("admin"), productControllers.deleteProduct);

export default router;
