import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Part = mongoose.models.Part || mongoose.model("Part", Schema);

export default Part;
