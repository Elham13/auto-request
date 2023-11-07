import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
dotenv.config();

import allRoutes from "./routes";
import connectDb from "./config/db";
import { croneJob, errorHandler, sendMail } from "./utils/helpers";
import axios from "axios";
const app: Express = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.use("/api", allRoutes);

croneJob();
// sendMail();

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ success: false, message: "Address not found" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
