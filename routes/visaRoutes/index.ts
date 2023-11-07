import { Router } from "express";
import { runAutoRequest } from "./controllers/get";

const visaRoutes = Router();

visaRoutes.route("/").get(runAutoRequest);

export default visaRoutes;
