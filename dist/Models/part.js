"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Part name is required"],
    },
    photos: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: "",
    },
    modal: {
        type: String,
        default: "",
    },
}, { timestamps: true });
const Part = mongoose_1.default.models.Part || mongoose_1.default.model("Part", Schema);
exports.default = Part;
