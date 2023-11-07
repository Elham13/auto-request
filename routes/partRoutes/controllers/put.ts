import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/helpers";
import Part from "../../../Models/part";

export const updatePart = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  delete req.body.id;
  if (!id) throw new Error("id field missing in request body");
  const updatedRecord = await Part.findOneAndUpdate({ _id: id }, req.body);

  if (!updatedRecord) throw new Error("Nothing updated");

  return res
    .status(200)
    .json({ success: true, message: "Updated", updatedRecord });
});
