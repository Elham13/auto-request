"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        enum: {
            values: ["Admin", "Customer"],
            message: "Please provide one of the following values:=> Customer, Admin",
        },
        required: [true, "role is required"],
    },
}, { timestamps: true });
// Hash the password before saving it
Schema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcryptjs_1.default.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcryptjs_1.default.hash(this.password, salt, (err, hash) => {
            if (err)
                return next(err);
            this.password = hash;
            next();
        });
    });
});
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", Schema);
exports.default = User;
