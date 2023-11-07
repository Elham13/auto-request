import { Request, Response } from "express";
import User from "../../../Models/user";
import { asyncHandler } from "../../../utils/helpers";

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  delete req.body.id;
  if (!id) throw new Error("id field missing in request body");
  const deletedRecord = await User.findOneAndDelete({ _id: id });

  if (!deletedRecord) throw new Error("No record found to delete");
  return res
    .status(200)
    .json({ success: true, message: "Deleted", deletedRecord });
});
