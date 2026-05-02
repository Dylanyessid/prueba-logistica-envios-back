import { AppDataSource } from "../config/db.js";
import type { CreateWarehouseDto, UpdateWarehouseDto } from "../dto/request/warehouse.dto.js";
import { Warehouse } from "../models/warehouse.js";
import { ErrorType } from "../utils/errrors.js";
import { fail, ok } from "../utils/result.js";

const warehouseRepository = AppDataSource.getRepository(Warehouse);

export default {
  async getAllWarehouses() {
    try {
      const warehouses = await warehouseRepository.find({
        order: { id: "ASC" },
      });

      return ok(warehouses);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      return fail("Error fetching warehouses", ErrorType.INTERNAL_ERROR);
    }
  },

  async getWarehouseById(id: number) {
    try {
      const warehouse = await warehouseRepository.findOne({ where: { id } });

      if (!warehouse) {
        return fail("Warehouse not found", ErrorType.NOT_FOUND);
      }

      return ok(warehouse);
    } catch (error) {
      console.error("Error fetching warehouse:", error);
      return fail("Error fetching warehouse", ErrorType.INTERNAL_ERROR);
    }
  },

  async createWarehouse(data: CreateWarehouseDto) {
    try {
      const warehouse = warehouseRepository.create(data);
      await warehouseRepository.save(warehouse);

      return ok(warehouse);
    } catch (error) {
      console.error("Error creating warehouse:", error);
      return fail("Error creating warehouse", ErrorType.INTERNAL_ERROR);
    }
  },

  async updateWarehouse(id: number, data: UpdateWarehouseDto) {
    try {
      const existingWarehouse = await warehouseRepository.findOne({ where: { id } });

      if (!existingWarehouse) {
        return fail("Warehouse not found", ErrorType.NOT_FOUND);
      }

      const updatedWarehouse = warehouseRepository.merge(existingWarehouse, data);
      await warehouseRepository.save(updatedWarehouse);

      return ok(updatedWarehouse);
    } catch (error) {
      console.error("Error updating warehouse:", error);
      return fail("Error updating warehouse", ErrorType.INTERNAL_ERROR);
    }
  },

  async deleteWarehouse(id: number) {
    try {
      const warehouse = await warehouseRepository.findOne({ where: { id } });

      if (!warehouse) {
        return fail("Warehouse not found", ErrorType.NOT_FOUND);
      }

      await warehouseRepository.softRemove(warehouse);
      return ok(warehouse);
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      return fail("Error deleting warehouse", ErrorType.INTERNAL_ERROR);
    }
  },
};
