"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
const helpers_1 = require("./utils/helpers");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, db_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)("dev"));
app.use("/api", routes_1.default);
(0, helpers_1.croneJob)();
// sendMain();
app.use("*", (req, res) => {
    return res.status(404).json({ success: false, message: "Address not found" });
});
app.use(helpers_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
