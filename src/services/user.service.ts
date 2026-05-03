import { AppDataSource } from "../config/db.js";
import type { CreateClientUserDto, UpdateClientUserDto } from "../dto/request/user.dto.js";
import { Client } from "../models/client.js";
import { User } from "../models/user.js";
import { ErrorType } from "../utils/errrors.js";
import { comparePassword, hashPassword } from "../utils/passwords.js";
import { fail, ok } from "../utils/result.js";

const userRepository = AppDataSource.getRepository(User);
const clientRepository = AppDataSource.getRepository(Client);
export default {
  async getClientUsers() {
    try {
      const users = await userRepository.find({
        where: { role: "client" },
        order: { id: "ASC" },
      });

      const clients = await clientRepository.find({
        order: { id: "ASC" },
      });

      const clientByUserId = new Map(clients.map((client) => [client.userId, client]));

      const clientUsers = users
        .map((user) => {
          const client = clientByUserId.get(user.id);

          if (!client) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: client.phone,
            document: client.document,
            address: client.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
            clientId: client.id,
          };
        })
        .filter(Boolean);

      return ok(clientUsers);
    } catch (error) {
      console.error("Error fetching client users:", error);
      return fail("Error fetching client users", ErrorType.INTERNAL_ERROR);
    }
  },

  async getClientUserById(userId: number) {
    try {
      const user = await userRepository.findOne({
        where: { id: userId, role: "client" },
      });

      if (!user) {
        return fail("Client user not found", ErrorType.NOT_FOUND);
      }

      const client = await clientRepository.findOne({
        where: { userId: user.id },
      });

      if (!client) {
        return fail("Client profile not found", ErrorType.NOT_FOUND);
      }

      return ok({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: client.phone,
        document: client.document,
        address: client.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
        clientId: client.id,
      });
    } catch (error) {
      console.error("Error fetching client user:", error);
      return fail("Error fetching client user", ErrorType.INTERNAL_ERROR);
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return fail("User not found", ErrorType.NOT_FOUND);
      }
      return ok(user);
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return fail("Error fetching user by email", ErrorType.INTERNAL_ERROR);
    }
  },

  async createUser(data: CreateClientUserDto) {
    try {
      const existingUser = await this.getUserByEmail(data.email);
      if (existingUser.success) {
        return fail("User already exists", ErrorType.CONFLICT);
      }
      const hashedPassword = await hashPassword(data.password);
      data.password = hashedPassword;
      const newUser = userRepository.create({ ...data, role: "client" });
      await userRepository.insert(newUser);
      return ok(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return fail("Error creating user", ErrorType.INTERNAL_ERROR);
    }
  },
  async loginUser(email: string, password: string) {
    try {
      const userResult = await this.getUserByEmail(email);
      if (!userResult.success) {
        return fail("Invalid email or password", ErrorType.BAD_REQUEST);
      }
      const user = userResult.value;
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return fail("Invalid email or password", ErrorType.BAD_REQUEST);
      }
   
      return ok({ ...user });
    } catch (error) {
      console.error("Error logging in user:", error);
      return fail("Error logging in user", ErrorType.INTERNAL_ERROR);
    }
  },

  async updateClientUser(userId: number, data: UpdateClientUserDto) {
    try {
      const user = await userRepository.findOne({
        where: { id: userId, role: "client" },
      });

      if (!user) {
        return fail("Client user not found", ErrorType.NOT_FOUND);
      }

      const client = await clientRepository.findOne({
        where: { userId },
      });

      if (!client) {
        return fail("Client profile not found", ErrorType.NOT_FOUND);
      }

      if (data.email && data.email !== user.email) {
        const existingUser = await userRepository.findOne({
          where: { email: data.email },
        });

        if (existingUser && existingUser.id !== user.id) {
          return fail("User already exists", ErrorType.CONFLICT);
        }
      }

      if (data.document && data.document !== client.document) {
        const existingClient = await clientRepository.findOne({
          where: { document: data.document },
        });

        if (existingClient && existingClient.id !== client.id) {
          return fail("Client document already exists", ErrorType.CONFLICT);
        }
      }

      if (data.name !== undefined) {
        user.name = data.name;
      }

      if (data.email !== undefined) {
        user.email = data.email;
      }

      if (data.password !== undefined) {
        user.password = await hashPassword(data.password);
      }

      if (data.phone !== undefined) {
        client.phone = data.phone;
      }

      if (data.document !== undefined) {
        client.document = data.document;
      }

      if (data.address !== undefined) {
        client.address = data.address;
      }

      await AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(User, user);
        await transactionalEntityManager.save(Client, client);
      });

      return ok({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: client.phone,
        document: client.document,
        address: client.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
        clientId: client.id,
      });
    } catch (error) {
      console.error("Error updating client user:", error);
      return fail("Error updating client user", ErrorType.INTERNAL_ERROR);
    }
  },

  async deleteClientUser(userId: number) {
    try {
      const user = await userRepository.findOne({
        where: { id: userId, role: "client" },
      });

      if (!user) {
        return fail("Client user not found", ErrorType.NOT_FOUND);
      }

      const client = await clientRepository.findOne({
        where: { userId },
      });

      if (!client) {
        return fail("Client profile not found", ErrorType.NOT_FOUND);
      }

      await AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.softRemove(Client, client);
        await transactionalEntityManager.softRemove(User, user);
      });

      return ok({
        userId: user.id,
        clientId: client.id,
      });
    } catch (error) {
      console.error("Error deleting client user:", error);
      return fail("Error deleting client user", ErrorType.INTERNAL_ERROR);
    }
  },
};
