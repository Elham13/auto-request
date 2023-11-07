import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/helpers";
import Part from "../../../Models/part";

export const getAllParts = asyncHandler(async (req: Request, res: Response) => {
  const data = await Part.find({});
  return res.status(200).json({ success: true, message: "Fetched", data });
});
