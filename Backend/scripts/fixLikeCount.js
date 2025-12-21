// scripts/fixLikesCount.js
import mongoose from "mongoose";
import Product from "../models/Products.model.js";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  await mongoose.connect(
    process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/ecommerce"
  );
  const products = await Product.find();
  for (const p of products) {
    p.likesCount = Array.isArray(p.likes) ? p.likes.length : 0;
    await p.save();
    console.log("fixed", p._id.toString(), p.likesCount);
  }
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
