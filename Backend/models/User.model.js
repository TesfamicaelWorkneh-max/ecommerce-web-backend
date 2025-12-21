// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },

//   role: { type: String, enum: ["user", "admin"], default: "user" },
//   isBlocked: { type: Boolean, default: false },
//   isVerified: { type: Boolean, default: false },
//   verifyToken: String,
//   verifyTokenExpires: Date,

//   resetPasswordToken: String,
//   resetPasswordExpires: Date,

//   createdAt: { type: Date, default: Date.now },
// });

// // Hash password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Clear verification after success
// userSchema.methods.clearVerification = function () {
//   this.verifyToken = undefined;
//   this.verifyTokenExpires = undefined;
//   this.isVerified = true;
// };

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: { type: String, enum: ["user", "admin"], default: "user" },
  isBlocked: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },

  verifyToken: String,
  verifyTokenExpires: Date,

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  refreshToken: { type: String }, // ⭐ NEW

  createdAt: { type: Date, default: Date.now },
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
