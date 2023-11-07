import { Router } from "express";
import userRoutes from "./userRoutes";
import partRoutes from "./partRoutes";
import { verifyToken } from "../utils/jwt";
import visaRoutes from "./visaRoutes";

const allRoutes = Router();

allRoutes.use("/user", userRoutes);
allRoutes.use("/part", verifyToken, partRoutes);
allRoutes.use("/visa", visaRoutes);



export default allRoutes;
