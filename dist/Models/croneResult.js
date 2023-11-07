"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    successCount: {
        type: Number,
    },
    failureCount: {
        type: Number,
    },
    cookieExpiredCount: {
        type: Number,
    },
    successSnaps: {
        type: [Date],
        default: [],
    },
}, { timestamps: true });
const CroneResult = mongoose_1.default.models.CroneResult || mongoose_1.default.model("CroneResult", Schema);
exports.default = CroneResult;
