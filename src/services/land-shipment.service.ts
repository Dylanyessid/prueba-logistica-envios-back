import { AppDataSource } from "../config/db.js";
import type { CreateLandShipmentDto } from "../dto/request/land-shipment.dto.js";
import { Client } from "../models/client.js";
import { LandShipment } from "../models/landShipment.js";
import { Product } from "../models/product.js";
import { SeaShipment } from "../models/seaShipment.js";
import { User } from "../models/user.js";
import { Warehouse } from "../models/warehouse.js";
import { ErrorType } from "../utils/errrors.js";
import { fail, ok } from "../utils/result.js";

const clientRepository = AppDataSource.getRepository(Client);
const productRepository = AppDataSource.getRepository(Product);
const warehouseRepository = AppDataSource.getRepository(Warehouse);
const landShipmentRepository = AppDataSource.getRepository(LandShipment);
const seaShipmentRepository = AppDataSource.getRepository(SeaShipment);
const userRepository = AppDataSource.getRepository(User);

const LAND_DISCOUNT_PERCENTAGE = 5;

const roundCurrency = (value: number): number => Number(value.toFixed(2));

const buildPriceSummary = (shippingPrice: number, productQuantity: number) => {
  const discountPercentage = productQuantity > 10 ? LAND_DISCOUNT_PERCENTAGE : 0;
  const discountAmount = roundCurrency(shippingPrice * (discountPercentage / 100));
  const finalPrice = roundCurrency(shippingPrice - discountAmount);

  return { discountPercentage, discountAmount, finalPrice };
};

export default {
  async getAllLandShipments() {
    try {
      const shipments = await landShipmentRepository.find({
        order: { id: "ASC" },
      });

      return ok(shipments);
    } catch (error) {
      console.error("Error fetching land shipments:", error);
      return fail("Error fetching land shipments", ErrorType.INTERNAL_ERROR);
    }
  },

  async getLandShipmentById(id: number) {
    try {
      const shipment = await landShipmentRepository.findOne({
        where: { id },
      });

      if (!shipment) {
        return fail("Land shipment not found", ErrorType.NOT_FOUND);
      }

      return ok(shipment);
    } catch (error) {
      console.error("Error fetching land shipment:", error);
      return fail("Error fetching land shipment", ErrorType.INTERNAL_ERROR);
    }
  },

  async deleteLandShipment(id: number) {
    try {
      const shipment = await landShipmentRepository.findOne({
        where: { id },
      });

      if (!shipment) {
        return fail("Land shipment not found", ErrorType.NOT_FOUND);
      }

      await landShipmentRepository.softRemove(shipment);

      return ok(shipment);
    } catch (error) {
      console.error("Error deleting land shipment:", error);
      return fail("Error deleting land shipment", ErrorType.INTERNAL_ERROR);
    }
  },

  async createLandShipment(data: CreateLandShipmentDto) {
    try {
      const client = await clientRepository.findOne({ where: { id: data.clientId } });
      if (!client) {
        return fail("Client not found", ErrorType.NOT_FOUND);
      }

      const user = await userRepository.findOne({ where: { id: client.userId } });
      if (!user) {
        return fail("Client user not found", ErrorType.NOT_FOUND);
      }

      const product = await productRepository.findOne({ where: { id: data.productId } });
      if (!product) {
        return fail("Product not found", ErrorType.NOT_FOUND);
      }

      const warehouse = await warehouseRepository.findOne({
        where: { id: data.destinationWarehouseId },
      });
      if (!warehouse) {
        return fail("Warehouse not found", ErrorType.NOT_FOUND);
      }

      const existingLandShipment = await landShipmentRepository.findOne({
        where: { trackingNumber: data.trackingNumber },
      });
      const existingSeaShipment = await seaShipmentRepository.findOne({
        where: { trackingNumber: data.trackingNumber },
      });

      if (existingLandShipment || existingSeaShipment) {
        return fail("Tracking number already exists", ErrorType.CONFLICT);
      }

      const registrationDate = new Date(data.registrationDate);
      const deliveryDate = new Date(data.deliveryDate);

      if (deliveryDate < registrationDate) {
        return fail("Delivery date must be greater than or equal to registration date", ErrorType.BAD_REQUEST);
      }

      const { discountPercentage, discountAmount, finalPrice } = buildPriceSummary(
        data.shippingPrice,
        data.productQuantity,
      );

      const shipment = landShipmentRepository.create({
        ...data,
        clientName: user.name,
        clientDocument: client.document,
        productName: product.name,
        destinationWarehouseName: warehouse.name,
        vehiclePlate: data.vehiclePlate.toUpperCase(),
        trackingNumber: data.trackingNumber.toUpperCase(),
        registrationDate,
        deliveryDate,
        discountPercentage,
        discountAmount,
        finalPrice,
      });

      await landShipmentRepository.save(shipment);

      return ok({
        shipment,
        pricing: {
          shippingPrice: data.shippingPrice,
          discountPercentage,
          discountAmount,
          finalPrice,
        },
      });
    } catch (error) {
      console.error("Error creating land shipment:", error);
      return fail("Error creating land shipment", ErrorType.INTERNAL_ERROR);
    }
  },
};
