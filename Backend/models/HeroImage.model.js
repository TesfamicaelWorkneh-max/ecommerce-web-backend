import mongoose from "mongoose";

const heroImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const HeroImage = mongoose.model("HeroImage", heroImageSchema);
export default HeroImage;
