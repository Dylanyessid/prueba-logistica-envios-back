import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.js';

const JWT_SECRET =envs.JWT_SECRET;

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};