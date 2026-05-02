import type{ Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/db.js";
import { User } from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";

type JwtPayload = {
  userId: number;
};

const userRepository = AppDataSource.getRepository(User);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  const token = authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
  try {
    const decoded = verifyToken(token) as JwtPayload;

    if (!decoded?.userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const user = await userRepository.findOne({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};
