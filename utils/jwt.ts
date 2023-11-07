import jwt from "jsonwebtoken";
import { asyncHandler } from "./helpers";
import { NextFunction, Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = async (data: any) => {
  try {
    if (JWT_SECRET) {
      const token = await jwt.sign(data, JWT_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      });
      return token;
    }
    return undefined;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;
    if (JWT_SECRET && token) {
      const decoded = await jwt.verify(token, JWT_SECRET);
      console.log("decoded", decoded);
    }
  }
);
