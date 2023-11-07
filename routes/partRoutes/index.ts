import { Router } from "express";
import { getAllParts } from "./controllers/get";
import { createPart } from "./controllers/post";
import { updatePart } from "./controllers/put";
import { deletePart } from "./controllers/delete";

const partRoutes = Router();

partRoutes
  .route("/")
  .get(getAllParts)
  .post(createPart)
  .put(updatePart)
  .delete(deletePart);

export default partRoutes;
