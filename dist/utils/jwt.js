"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("./helpers");
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (JWT_SECRET) {
            const token = yield jsonwebtoken_1.default.sign(data, JWT_SECRET, {
                expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
            });
            return token;
        }
        return undefined;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.generateToken = generateToken;
exports.verifyToken = (0, helpers_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (JWT_SECRET && token) {
        const decoded = yield jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("decoded", decoded);
    }
}));
