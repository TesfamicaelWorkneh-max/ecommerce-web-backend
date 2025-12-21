import mongoose from "mongoose";

const ReturnRequestSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      enum: {
        values: [
          "defective",
          "wrong_item",
          "not_as_described",
          "size_issue",
          "damaged",
          "quality_issue",
          "other",
        ],
        message: "{VALUE} is not a valid reason",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    transactionProof: {
      type: String,
      required: [true, "Transaction proof is required"],
    },
    additionalImages: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "refund_processing",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    adminNotes: {
      type: String,
      default: "",
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundMethod: {
      type: String,
      enum: ["original_payment", "store_credit", "bank_transfer", ""],
      default: "",
    },
    refundProcessedAt: {
      type: Date,
    },
    trackingNumber: {
      type: String,
      default: "",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for return eligibility status
ReturnRequestSchema.virtual("isEligible").get(function () {
  if (!this.order?.createdAt) return false;

  const daysDiff = Math.floor(
    (Date.now() - new Date(this.order.createdAt)) / (1000 * 60 * 60 * 24)
  );
  return daysDiff <= 30;
});

// Pre-save middleware
ReturnRequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for better performance
ReturnRequestSchema.index({ user: 1, status: 1 });
ReturnRequestSchema.index({ order: 1 });
ReturnRequestSchema.index({ status: 1, createdAt: -1 });
ReturnRequestSchema.index({ user: 1, product: 1 });

const ReturnRequest = mongoose.model("ReturnRequest", ReturnRequestSchema);
export default ReturnRequest;
