import { Router } from "express";
import { getAllUsers } from "./controllers/get";
import { createUser, login } from "./controllers/post";
import { updateUser } from "./controllers/put";
import { deleteUser } from "./controllers/delete";
import { verifyToken } from "../../utils/jwt";

const userRoutes = Router();

userRoutes
  .route("/")
  .get(verifyToken, getAllUsers)
  .post(createUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

userRoutes.route("/login").post(login);

export default userRoutes;
