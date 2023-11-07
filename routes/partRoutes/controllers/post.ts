import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/helpers";
import Part from "../../../Models/part";

export const createPart = asyncHandler(async (req: Request, res: Response) => {
  const newRecord = await Part.create(req.body);
  return res.status(201).json({ success: true, message: "Created", newRecord });
});
