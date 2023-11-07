"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_1 = require("./controllers/get");
const visaRoutes = (0, express_1.Router)();
visaRoutes.route("/").get(get_1.runAutoRequest);
exports.default = visaRoutes;
