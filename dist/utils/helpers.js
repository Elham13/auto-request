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
exports.sendMain = exports.croneJob = exports.errorHandler = exports.asyncHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const croneResult_1 = __importDefault(require("../Models/croneResult"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
const errorHandler = (err, req, res, next) => {
    var _a;
    let message = err.message;
    if (err.code === 11000) {
        message = `Record with this ${(_a = Object.keys(err.keyPattern)) === null || _a === void 0 ? void 0 : _a[0]} already exist`;
    }
    return res.status(500).json({ success: false, message });
};
exports.errorHandler = errorHandler;
const croneJob = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cookie = "a7b26b4ef0c65df91a0112a76b06b06f";
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get("https://evisatraveller.mfa.ir/en/request/applyrequest/", {
                headers: {
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Cache-Control": "no-cache",
                    Connection: "keep-alive",
                    Cookie: `__arcsjs=${cookie}; csrftoken=Hi7EombJUDfoQx7zZHhIvdh3IBe1yuCxl0TH41Nh7Xa8hcBBiQQMCQRr3GsobqX8`,
                    Host: "evisatraveller.mfa.ir",
                    Pragma: "no-cache",
                    Referer: "https://evisatraveller.mfa.ir/en/request/applyrequest/",
                },
            });
            let found = false;
            const dbData = yield croneResult_1.default.findById("65465e38db1e9b39f87757f2");
            const searchTerm = new RegExp("kabul", "i");
            const isFailed = new RegExp("Transferring to the website", "i");
            if (isFailed.test(data)) {
                yield croneResult_1.default.findByIdAndUpdate(dbData === null || dbData === void 0 ? void 0 : dbData._id, {
                    $set: {
                        cookieExpiredCount: dbData.cookieExpiredCount + 1,
                    },
                });
            }
            else {
                if (searchTerm.test(data))
                    found = true;
                if (found) {
                    yield croneResult_1.default.findByIdAndUpdate(dbData === null || dbData === void 0 ? void 0 : dbData._id, {
                        $set: {
                            successCount: dbData.successCount + 1,
                            successSnaps: [...dbData.successSnaps, new Date()],
                        },
                    });
                }
                else {
                    yield croneResult_1.default.findByIdAndUpdate(dbData === null || dbData === void 0 ? void 0 : dbData._id, {
                        $set: {
                            failureCount: dbData.failureCount + 1,
                        },
                    });
                }
            }
        }), 100000);
        // await fs.writeFile("error.html", "<h1>Hi</h1>", (err) => {
        //   console.log(err?.message);
        // });
        // const text = await fs.readFile("index.html", (err, data) => {
        //   if (err) console.log("Read error: ", err.message);
        //   console.log("data: ", data.toString());
        // });
        // console.log("text: ", text);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.croneJob = croneJob;
const sendMain = () => {
    const transporter = nodemailer_1.default.createTransport({
        service: "Gmail",
        auth: {
            user: "wolverine.elham@gmail.com",
            pass: "geawccliiplmaeiv",
        },
    });
    const mailOptions = {
        from: "wolverine.elham@gmail.com",
        to: "sofiiya.parveen@gmail.com",
        subject: "Hello from Node.js",
        text: "This is a test email sent from Node.js.", // Email content
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
};
exports.sendMain = sendMain;
