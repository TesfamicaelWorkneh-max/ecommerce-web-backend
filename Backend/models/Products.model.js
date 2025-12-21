import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
  intro: { type: String, default: "" },
  keyFeatures: { type: [String], default: [] },
  howToUse: { type: String, default: "" },
  ingredients: { type: String, default: "" },
  benefits: { type: [String], default: [] },
  storage: { type: String, default: "" },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  group: { type: String, default: null },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  image: { type: String, default: "" },
  images: { type: [String], default: [] },

  isSold: { type: Boolean, default: false },
  description: { type: descriptionSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now },
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Product", productSchema);
