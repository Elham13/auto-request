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
exports.updatePart = void 0;
const helpers_1 = require("../../../utils/helpers");
const part_1 = __importDefault(require("../../../Models/part"));
exports.updatePart = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    delete req.body.id;
    if (!id)
        throw new Error("id field missing in request body");
    const updatedRecord = yield part_1.default.findOneAndUpdate({ _id: id }, req.body);
    if (!updatedRecord)
        throw new Error("Nothing updated");
    return res
        .status(200)
        .json({ success: true, message: "Updated", updatedRecord });
}));
