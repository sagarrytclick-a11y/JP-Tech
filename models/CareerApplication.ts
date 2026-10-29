import mongoose from "mongoose";

const CareerApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    resumeUrl: { type: String, required: true, trim: true },
    resumeName: { type: String, default: "", trim: true },
    resumeProvider: { type: String, default: "imagekit" },
    status: {
      type: String,
      enum: ["new", "shortlisted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

CareerApplicationSchema.index({ createdAt: -1 });
CareerApplicationSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.CareerApplication ||
  mongoose.model("CareerApplication", CareerApplicationSchema);
