import { AppDataSource } from "../config/db.js";
import type { CreateUserDto } from "../dto/request/user.dto.js";
import { User } from "../models/user.js";
import { ErrorType } from "../utils/errrors.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/passwords.js";
import { fail, ok } from "../utils/result.js";

const userRepository = AppDataSource.getRepository(User);
export default {
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

  async createUser(data: CreateUserDto) {
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
      const token = generateToken({ userId: user.id });
      return ok({ ...user, token });
    } catch (error) {
      console.error("Error logging in user:", error);
      return fail("Error logging in user", ErrorType.INTERNAL_ERROR);
    }
  },
};
