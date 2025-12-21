import mongoose from "mongoose";

// Sub-schema for items
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Main order schema
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [orderItemSchema],

    total: { type: Number, required: true },

    // ================================
    // ORDER STATUS
    // ================================
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    deliveredAt: { type: Date, default: null },

    // ================================
    // 🟢 PAYMENT SYSTEM
    // ================================
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },

    paymentMethod: {
      type: String,
      enum: ["chapa", "cod"], // cod = cash on delivery
      default: "chapa",
    },

    tx_ref: { type: String, default: null }, // Chapa unique reference

    paidAt: { type: Date, default: null }, // set after payment success

    paymentResult: { type: Object, default: {} }, // store Chapa response or COD info

    // ================================
    // Optional shipping / customer info
    // ================================
    shippingAddress: {
      fullName: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      addressLine1: { type: String, default: "" },
      addressLine2: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      postalCode: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

// ================================
// 🔹 SCHEMA METHODS / HELPERS
// ================================

// Mark order as paid (Chapa or COD)
orderSchema.methods.markPaid = function (paymentResult = {}, method = "chapa") {
  this.paymentStatus = "paid";
  this.paymentMethod = method;
  this.paidAt = new Date();
  this.paymentResult = paymentResult;
};

// Mark order as failed
orderSchema.methods.markFailed = function (paymentResult = {}) {
  this.paymentStatus = "failed";
  this.paymentResult = paymentResult;
};

// Check if order is fully paid
orderSchema.methods.isPaidCheck = function () {
  return this.paymentStatus === "paid";
};

// Mark delivered
orderSchema.methods.markDelivered = function () {
  this.status = "delivered";
  this.deliveredAt = new Date();
};

export default mongoose.model("Order", orderSchema);
