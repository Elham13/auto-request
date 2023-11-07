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
exports.deleteUser = void 0;
const user_1 = __importDefault(require("../../../Models/user"));
const helpers_1 = require("../../../utils/helpers");
exports.deleteUser = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    delete req.body.id;
    if (!id)
        throw new Error("id field missing in request body");
    const deletedRecord = yield user_1.default.findOneAndDelete({ _id: id });
    if (!deletedRecord)
        throw new Error("No record found to delete");
    return res
        .status(200)
        .json({ success: true, message: "Deleted", deletedRecord });
}));
