import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../../Models/user";
import { asyncHandler } from "../../../utils/helpers";
import { generateToken } from "../../../utils/jwt";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newRecord = await User.create(req.body);
  return res.status(201).json({ success: true, message: "Created", newRecord });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  if (!phone) throw new Error("Phone number is required");
  if (!password) throw new Error("Password is required");

  const user = await User.findOne({ phone });

  if (!user) throw new Error("Wrong credentials, please try again.");

  const matchPassword = await bcrypt.compareSync(password, user.password);

  if (!matchPassword) throw new Error("Wrong credentials, please try again.");

  const token = await generateToken({
    name: user.name,
    role: user.role,
    phone: user.phone,
  });

  return res.status(200).json({
    success: true,
    message: "Login Success",
    data: { ...user?._doc, token },
  });
});
