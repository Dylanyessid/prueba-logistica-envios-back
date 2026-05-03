import { AppDataSource } from "../config/db.js";
import type { CreateClientUserDto } from "../dto/request/user.dto.js";
import { Client } from "../models/client.js";
import { ErrorType } from "../utils/errrors.js";
import { fail, ok } from "../utils/result.js";

const clientRepository = AppDataSource.getRepository(Client);
export default {
  async getClientByUserId(userId: number) {
    try {
      const client = await clientRepository.findOne({ where: { userId } });
      if (!client) {
        return fail("Client not found", ErrorType.NOT_FOUND);
      }
      return ok(client);
    }catch (error) {
      console.error("Error fetching client by user ID:", error);
      return fail("Error fetching client by user ID", ErrorType.INTERNAL_ERROR);
    }
  },
  async createClient(data: CreateClientUserDto & { userId: number }) {
    try {
      const client = clientRepository.create(data);
      await clientRepository.save(client);
      return ok(client);
    } catch (error) {
      console.error("Error creating client:", error);
      return fail("Error creating client", ErrorType.INTERNAL_ERROR);
    }
  }
}