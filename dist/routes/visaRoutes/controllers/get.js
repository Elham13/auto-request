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
exports.runAutoRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const helpers_1 = require("../../../utils/helpers");
exports.runAutoRequest = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get("https://evisatraveller.mfa.ir/en/request/applyrequest/", {
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            Cookie: "__arcsjs=5ce050dc566e64fbf33bfa35da2d61f7; csrftoken=Hi7EombJUDfoQx7zZHhIvdh3IBe1yuCxl0TH41Nh7Xa8hcBBiQQMCQRr3GsobqX8",
            Host: "evisatraveller.mfa.ir",
            Pragma: "no-cache",
            Referer: "https://evisatraveller.mfa.ir/en/request/applyrequest/",
        },
    });
    let found = false;
    if (data === null || data === void 0 ? void 0 : data.includes("Kabul"))
        found = true;
    return res
        .status(200)
        .json({ success: true, message: "Fetched", data: found });
}));
