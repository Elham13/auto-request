import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    successCount: {
      type: Number,
    },
    failureCount: {
      type: Number,
    },
    cookieExpiredCount: {
      type: Number,
    },
    successSnaps: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

const CroneResult =
  mongoose.models.CroneResult || mongoose.model("CroneResult", Schema);

export default CroneResult;
