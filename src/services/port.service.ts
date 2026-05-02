import { AppDataSource } from "../config/db.js";
import type { CreatePortDto, UpdatePortDto } from "../dto/request/port.dto.js";
import { Port } from "../models/ports.js";
import { ErrorType } from "../utils/errrors.js";
import { fail, ok } from "../utils/result.js";

const portRepository = AppDataSource.getRepository(Port);

export default {
  async getAllPorts() {
    try {
      const ports = await portRepository.find({
        order: { id: "ASC" },
      });

      return ok(ports);
    } catch (error) {
      console.error("Error fetching ports:", error);
      return fail("Error fetching ports", ErrorType.INTERNAL_ERROR);
    }
  },

  async getPortById(id: number) {
    try {
      const port = await portRepository.findOne({ where: { id } });

      if (!port) {
        return fail("Port not found", ErrorType.NOT_FOUND);
      }

      return ok(port);
    } catch (error) {
      console.error("Error fetching port:", error);
      return fail("Error fetching port", ErrorType.INTERNAL_ERROR);
    }
  },

  async createPort(data: CreatePortDto) {
    try {
      const port = portRepository.create(data);
      await portRepository.save(port);

      return ok(port);
    } catch (error) {
      console.error("Error creating port:", error);
      return fail("Error creating port", ErrorType.INTERNAL_ERROR);
    }
  },

  async updatePort(id: number, data: UpdatePortDto) {
    try {
      const existingPort = await portRepository.findOne({ where: { id } });

      if (!existingPort) {
        return fail("Port not found", ErrorType.NOT_FOUND);
      }

      const updatedPort = portRepository.merge(existingPort, data);
      await portRepository.save(updatedPort);

      return ok(updatedPort);
    } catch (error) {
      console.error("Error updating port:", error);
      return fail("Error updating port", ErrorType.INTERNAL_ERROR);
    }
  },

  async deletePort(id: number) {
    try {
      const port = await portRepository.findOne({ where: { id } });

      if (!port) {
        return fail("Port not found", ErrorType.NOT_FOUND);
      }

      await portRepository.softRemove(port);
      return ok(port);
    } catch (error) {
      console.error("Error deleting port:", error);
      return fail("Error deleting port", ErrorType.INTERNAL_ERROR);
    }
  },
};
