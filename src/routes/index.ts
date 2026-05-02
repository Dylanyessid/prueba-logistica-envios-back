import { Router } from "express";
import landShipmentRoutes from "./land-shipment.routes.js";
import portRoutes from "./port.routes.js";
import productRoutes from "./product.routes.js";
import seaShipmentRoutes from "./sea-shipment.routes.js";
import userRoutes from "./user.routes.js";
import warehouseRoutes from "./warehouse.routes.js";

const apiRouter = Router();

apiRouter.use('/users', userRoutes)
apiRouter.use('/products', productRoutes)
apiRouter.use('/ports', portRoutes)
apiRouter.use('/warehouses', warehouseRoutes)
apiRouter.use('/land-shipments', landShipmentRoutes)
apiRouter.use('/sea-shipments', seaShipmentRoutes)

export default apiRouter;
