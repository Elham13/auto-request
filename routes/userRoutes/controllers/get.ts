import { Request, Response } from "express";
import User from "../../../Models/user";
import { asyncHandler } from "../../../utils/helpers";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const data = await User.find({});
  return res.status(200).json({ success: true, message: "Fetched", data });
});
