"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_1 = require("./controllers/get");
const post_1 = require("./controllers/post");
const put_1 = require("./controllers/put");
const delete_1 = require("./controllers/delete");
const jwt_1 = require("../../utils/jwt");
const userRoutes = (0, express_1.Router)();
userRoutes
    .route("/")
    .get(jwt_1.verifyToken, get_1.getAllUsers)
    .post(post_1.createUser)
    .put(jwt_1.verifyToken, put_1.updateUser)
    .delete(jwt_1.verifyToken, delete_1.deleteUser);
userRoutes.route("/login").post(post_1.login);
exports.default = userRoutes;
