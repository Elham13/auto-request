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
exports.login = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../../../Models/user"));
const helpers_1 = require("../../../utils/helpers");
const jwt_1 = require("../../../utils/jwt");
exports.createUser = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecord = yield user_1.default.create(req.body);
    return res.status(201).json({ success: true, message: "Created", newRecord });
}));
exports.login = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    if (!phone)
        throw new Error("Phone number is required");
    if (!password)
        throw new Error("Password is required");
    const user = yield user_1.default.findOne({ phone });
    if (!user)
        throw new Error("Wrong credentials, please try again.");
    const matchPassword = yield bcryptjs_1.default.compareSync(password, user.password);
    if (!matchPassword)
        throw new Error("Wrong credentials, please try again.");
    const token = yield (0, jwt_1.generateToken)({
        name: user.name,
        role: user.role,
        phone: user.phone,
    });
    return res.status(200).json({
        success: true,
        message: "Login Success",
        data: Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user._doc), { token }),
    });
}));
