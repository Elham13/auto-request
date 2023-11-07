"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_1 = require("./controllers/get");
const post_1 = require("./controllers/post");
const put_1 = require("./controllers/put");
const delete_1 = require("./controllers/delete");
const partRoutes = (0, express_1.Router)();
partRoutes
    .route("/")
    .get(get_1.getAllParts)
    .post(post_1.createPart)
    .put(put_1.updatePart)
    .delete(delete_1.deletePart);
exports.default = partRoutes;
