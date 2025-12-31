// // import mongoose from "mongoose";

// // const categorySchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true, unique: true },
// //     image: { type: String }, // optional image for category
// //   },
// //   { timestamps: true }
// // );

// // const Category = mongoose.model("Category", categorySchema);
// // export default Category;
// import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     description: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Category", categorySchema);
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },

    image: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
