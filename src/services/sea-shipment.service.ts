import { AppDataSource } from "../config/db.js";
import type { CreateSeaShipmentDto, UpdateSeaShipmentDto } from "../dto/request/sea-shipment.dto.js";
import { Client } from "../models/client.js";
import { Port } from "../models/ports.js";
import { Product } from "../models/product.js";
import { LandShipment } from "../models/landShipment.js";
import { SeaShipment } from "../models/seaShipment.js";
import { User } from "../models/user.js";
import { ErrorType } from "../utils/errrors.js";
import { fail, ok } from "../utils/result.js";

const clientRepository = AppDataSource.getRepository(Client);
const productRepository = AppDataSource.getRepository(Product);
const portRepository = AppDataSource.getRepository(Port);
const landShipmentRepository = AppDataSource.getRepository(LandShipment);
const seaShipmentRepository = AppDataSource.getRepository(SeaShipment);
const userRepository = AppDataSource.getRepository(User);

const SEA_DISCOUNT_PERCENTAGE = 3;

const roundCurrency = (value: number): number => Number(value.toFixed(2));

const buildPriceSummary = (shippingPrice: number, productQuantity: number) => {
  const discountPercentage = productQuantity > 10 ? SEA_DISCOUNT_PERCENTAGE : 0;
  const discountAmount = roundCurrency(shippingPrice * (discountPercentage / 100));
  const finalPrice = roundCurrency(shippingPrice - discountAmount);

  return { discountPercentage, discountAmount, finalPrice };
};

export default {
  async getAllSeaShipments() {
    try {
      const shipments = await seaShipmentRepository.find({
        order: { id: "ASC" },
      });

      return ok(shipments);
    } catch (error) {
      console.error("Error fetching sea shipments:", error);
      return fail("Error fetching sea shipments", ErrorType.INTERNAL_ERROR);
    }
  },

  async getSeaShipmentById(id: number) {
    try {
      const shipment = await seaShipmentRepository.findOne({
        where: { id },
      });

      if (!shipment) {
        return fail("Sea shipment not found", ErrorType.NOT_FOUND);
      }

      return ok(shipment);
    } catch (error) {
      console.error("Error fetching sea shipment:", error);
      return fail("Error fetching sea shipment", ErrorType.INTERNAL_ERROR);
    }
  },

  async deleteSeaShipment(id: number) {
    try {
      const shipment = await seaShipmentRepository.findOne({
        where: { id },
      });

      if (!shipment) {
        return fail("Sea shipment not found", ErrorType.NOT_FOUND);
      }

      await seaShipmentRepository.softRemove(shipment);

      return ok(shipment);
    } catch (error) {
      console.error("Error deleting sea shipment:", error);
      return fail("Error deleting sea shipment", ErrorType.INTERNAL_ERROR);
    }
  },

  async updateSeaShipment(id: number, data: UpdateSeaShipmentDto) {
    try {
      const shipment = await seaShipmentRepository.findOne({
        where: { id },
      });

      if (!shipment) {
        return fail("Sea shipment not found", ErrorType.NOT_FOUND);
      }


      let clientName = shipment.clientName;
      let clientDoc = shipment.clientDocument;
     

      let productName = shipment.productName;
      if (data.productId) {
        const product = await productRepository.findOne({ where: { id: data.productId } });
        if (!product) {
          return fail("Product not found", ErrorType.NOT_FOUND);
        }
        productName = product.name;
      }

      let portName = shipment.destinationPortName;
      if (data.destinationPortId) {
        const port = await portRepository.findOne({ where: { id: data.destinationPortId } });
        if (!port) {
          return fail("Port not found", ErrorType.NOT_FOUND);
        }
        portName = port.name;
      }

      const existingTrackingNumber = data.trackingNumber ? data.trackingNumber.toUpperCase() : shipment.trackingNumber;
      if (data.trackingNumber && data.trackingNumber !== shipment.trackingNumber) {
        const existingLandShipment = await landShipmentRepository.findOne({
          where: { trackingNumber: existingTrackingNumber },
        });
        const existingSeaShipment = await seaShipmentRepository.findOne({
          where: { trackingNumber: existingTrackingNumber },
        });

        if (existingLandShipment || existingSeaShipment) {
          return fail("Tracking number already exists", ErrorType.CONFLICT);
        }
      }

      const productQuantity = data.productQuantity ?? shipment.productQuantity;
      const shippingPrice = data.shippingPrice ?? shipment.shippingPrice;

      const registrationDate = data.registrationDate
        ? new Date(data.registrationDate)
        : shipment.registrationDate;
      const deliveryDate = data.deliveryDate
        ? new Date(data.deliveryDate)
        : shipment.deliveryDate;

      if (deliveryDate < registrationDate) {
        return fail("Delivery date must be greater than or equal to registration date", ErrorType.BAD_REQUEST);
      }

      const { discountPercentage, discountAmount, finalPrice } = buildPriceSummary(
        shippingPrice,
        productQuantity,
      );

      const updatedShipment = {
        ...shipment,
        clientId: data.clientId ?? shipment.clientId,
        clientName: clientName,
        clientDocument: clientDoc,
        productId: data.productId ?? shipment.productId,
        productName: productName,
        destinationPortId: data.destinationPortId ?? shipment.destinationPortId,
        destinationPortName: portName,
        productQuantity,
        shippingPrice,
        fleetNumber: data.fleetNumber ? data.fleetNumber.toUpperCase() : shipment.fleetNumber,
        trackingNumber: existingTrackingNumber,
        registrationDate,
        deliveryDate,
        discountPercentage,
        discountAmount,
        finalPrice,
      };

      await seaShipmentRepository.save(updatedShipment);

      return ok({
        shipment: updatedShipment,
        pricing: {
          shippingPrice,
          discountPercentage,
          discountAmount,
          finalPrice,
        },
      });
    } catch (error) {
      console.error("Error updating sea shipment:", error);
      return fail("Error updating sea shipment", ErrorType.INTERNAL_ERROR);
    }
  },

  async createSeaShipment(data: CreateSeaShipmentDto) {
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

      const port = await portRepository.findOne({ where: { id: data.destinationPortId } });
      if (!port) {
        return fail("Port not found", ErrorType.NOT_FOUND);
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

      const shipment = seaShipmentRepository.create({
        ...data,
        clientName: user.name,
        clientDocument: client.document,
        productName: product.name,
        destinationPortName: port.name,
        fleetNumber: data.fleetNumber.toUpperCase(),
        trackingNumber: data.trackingNumber.toUpperCase(),
        registrationDate,
        deliveryDate,
        discountPercentage,
        discountAmount,
        finalPrice,
      });

      await seaShipmentRepository.save(shipment);

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
      console.error("Error creating sea shipment:", error);
      return fail("Error creating sea shipment", ErrorType.INTERNAL_ERROR);
    }
  },
};
