"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const partRoutes_1 = __importDefault(require("./partRoutes"));
const jwt_1 = require("../utils/jwt");
const visaRoutes_1 = __importDefault(require("./visaRoutes"));
const allRoutes = (0, express_1.Router)();
allRoutes.use("/user", userRoutes_1.default);
allRoutes.use("/part", jwt_1.verifyToken, partRoutes_1.default);
allRoutes.use("/visa", visaRoutes_1.default);
exports.default = allRoutes;
