import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUpload,
  FaCamera,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaBox,
  FaTag,
  FaUndo,
  FaReceipt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

// Helper function to get optimized Cloudinary URL
const getOptimizedCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  const {
    width = 800,
    height = 600,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  // Split the URL at /upload/
  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  const baseUrl = parts[0] + "/upload/";
  const imagePath = parts[1];

  // Build transformations
  let transformations = "";

  if (width || height) {
    transformations += `c_${crop},`;
    if (width) transformations += `w_${width},`;
    if (height) transformations += `h_${height},`;
  }

  if (quality) transformations += `q_${quality},`;
  if (format) transformations += `f_${format},`;

  // Remove trailing comma
  if (transformations.endsWith(",")) {
    transformations = transformations.slice(0, -1);
  }

  // Add transformations if any
  if (transformations) {
    transformations += "/";
  }

  return `${baseUrl}${transformations}${imagePath}`;
};

const AdminReturnRequest = ({ isOpen, onClose, order, product }) => {
  const [formData, setFormData] = useState({
    reason: "",
    description: "",
    transactionProof: null,
    additionalImages: [],
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const additionalImagesRef = useRef(null);

  if (!isOpen || !order || !product) return null;

  const handleMainProofUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await handleFileUpload(file, true);
    if (url) {
      setFormData((prev) => ({ ...prev, transactionProof: url }));
      toast.success("Transaction proof uploaded to Cloudinary");
    }
    setUploading(false);
  };

  const handleFileUpload = async (file, isMainProof = true) => {
    try {
      const baseUrl = BACKEND_URL;
      const endpoint = isMainProof
        ? `${baseUrl}/api/return-requests/upload/return-proof`
        : `${baseUrl}/api/return-requests/upload/return-images`;

      console.log("🔄 Uploading file to Cloudinary:", file.name);

      const formData = new FormData();
      formData.append(isMainProof ? "image" : "images", file);

      const res = await fetchWithAuth(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("Server returned non-JSON response");
      }

      const data = await res.json();

      if (data.success) {
        toast.success(
          data.message || "File uploaded successfully to Cloudinary!"
        );
        return isMainProof ? data.url : data.files?.[0]?.url;
      } else {
        toast.error(data.message || "Upload failed");
        return null;
      }
    } catch (error) {
      console.error("💥 Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
      return null;
    }
  };

  const handleAdditionalImages = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.additionalImages.length > 5) {
      toast.error("Maximum 5 additional images allowed");
      return;
    }

    setUploading(true);
    const uploadedUrls = [];

    if (files.length > 0) {
      try {
        const baseUrl = BACKEND_URL;
        const endpoint = `${baseUrl}/api/return-requests/upload/return-images`;
        const formDataToSend = new FormData();

        // Append all files
        files.forEach((file) => {
          formDataToSend.append("images", file);
        });

        console.log("📤 Uploading", files.length, "files to Cloudinary");

        const res = await fetchWithAuth(endpoint, {
          method: "POST",
          body: formDataToSend,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textResponse = await res.text();
          throw new Error("Server returned non-JSON response");
        }

        const data = await res.json();

        if (data.success) {
          // Get all uploaded URLs
          const urls = data.files.map((file) => file.url);
          uploadedUrls.push(...urls);
          toast.success(`${data.count} image(s) uploaded to Cloudinary`);
        } else {
          toast.error(data.message || "Upload failed");
        }
      } catch (error) {
        console.error("💥 Upload error:", error);
        toast.error(`Upload failed: ${error.message}`);
      }
    }

    if (uploadedUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...uploadedUrls],
      }));
    }
    setUploading(false);
  };

  const removeImage = (index, isMainProof = false) => {
    if (isMainProof) {
      setFormData((prev) => ({ ...prev, transactionProof: null }));
    } else {
      setFormData((prev) => ({
        ...prev,
        additionalImages: prev.additionalImages.filter((_, i) => i !== index),
      }));
    }
  };

  const checkEligibility = () => {
    const orderDate = new Date(order.createdAt);
    const daysDifference = Math.floor(
      (Date.now() - orderDate) / (1000 * 60 * 60 * 24)
    );
    const within30Days = daysDifference <= 30;
    const isFinalSale = product.isFinalSale || false;

    return [
      {
        label: "Within 30-day return window",
        valid: within30Days,
        value: within30Days
          ? `${30 - daysDifference} days remaining`
          : "Return window expired",
        icon: <FaCalendarAlt />,
        required: true,
      },
      {
        label: "Item in original condition",
        valid: true,
        value: "Please ensure item is unused and undamaged",
        icon: <FaBox />,
        required: true,
      },
      {
        label: "Original packaging included",
        valid: true,
        value: "Include all original boxes, tags, and accessories",
        icon: <FaTag />,
        required: true,
      },
      {
        label: "Not a final sale item",
        valid: !isFinalSale,
        value: isFinalSale
          ? "Final sale items cannot be returned"
          : "Eligible for return",
        icon: isFinalSale ? <FaTimesCircle /> : <FaCheckCircle />,
        required: true,
      },
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.reason ||
      !formData.description ||
      !formData.transactionProof
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Check eligibility
    const eligibility = checkEligibility();
    const isEligible = eligibility.every(
      (check) => check.valid || !check.required
    );

    if (!isEligible) {
      const ineligibleItems = eligibility.filter(
        (check) => !check.valid && check.required
      );
      toast.error(
        `Not eligible: ${ineligibleItems.map((item) => item.label).join(", ")}`
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/return-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order._id,
          productId: product._id,
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Return request submitted successfully!");
        onClose();
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (error) {
      toast.error("Error submitting request");
    } finally {
      setSubmitting(false);
    }
  };

  const eligibilityChecks = checkEligibility();
  const isEligible = eligibilityChecks.every(
    (check) => check.valid || !check.required
  );

  const reasonOptions = [
    { value: "defective", label: "Defective/Damaged Product" },
    { value: "wrong_item", label: "Wrong Item Received" },
    { value: "not_as_described", label: "Not as Described" },
    { value: "size_issue", label: "Size/Size Issue" },
    { value: "quality_issue", label: "Quality Issue" },
    { value: "damaged", label: "Arrived Damaged" },
    { value: "other", label: "Other Reason" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-white via-white/95 to-amber-50/50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 p-6 pb-4 border-b border-white/20 dark:border-slate-700/50 bg-gradient-to-r from-white/90 via-white/80 to-amber-50/40 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/40 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20 shadow-lg">
                      <FaUndo className="text-amber-600 dark:text-amber-400 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                        Request Return
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Order #{order._id.slice(-8).toUpperCase()} •{" "}
                        {product.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
                  >
                    <FaTimes className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Eligibility Banner */}
                <div className="p-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/3 to-transparent">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${isEligible ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}`}
                    >
                      {isEligible ? (
                        <FaCheckCircle />
                      ) : (
                        <FaExclamationTriangle />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {isEligible
                          ? "Item appears eligible for return"
                          : "Item may not be eligible"}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Based on our return policy
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Eligibility Checks */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <FaInfoCircle className="text-blue-500" />
                      Eligibility Check
                    </h3>
                    <div className="grid gap-2">
                      {eligibilityChecks.map((check, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-xl border transition-all duration-200 ${
                            check.valid
                              ? "bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20"
                              : check.required
                                ? "bg-gradient-to-r from-rose-500/5 to-pink-500/5 border-rose-500/20"
                                : "bg-gradient-to-r from-amber-500/5 to-amber-500/3 border-amber-500/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${check.valid ? "bg-green-500/10 text-green-500" : check.required ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"}`}
                              >
                                {check.icon}
                              </div>
                              <div>
                                <span className="font-medium text-slate-800 dark:text-white">
                                  {check.label}
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                  {check.value}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                check.valid
                                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                  : check.required
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              }`}
                            >
                              {check.valid
                                ? "✓ OK"
                                : check.required
                                  ? "Required"
                                  : "Warning"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Reason */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Reason for Return *
                      </label>
                      <select
                        value={formData.reason}
                        onChange={(e) =>
                          setFormData({ ...formData, reason: e.target.value })
                        }
                        className="w-full p-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/50 focus:border-amber-500 focus:ring-3 focus:ring-amber-500/20 outline-none transition-all duration-300 appearance-none"
                        required
                      >
                        <option value="">Select a reason</option>
                        {reasonOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Detailed Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Please describe the issue in detail. Include information about the problem, when you noticed it, and any other relevant details..."
                        className="w-full h-32 p-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/50 focus:border-amber-500 focus:ring-3 focus:ring-amber-500/20 outline-none transition-all duration-300 resize-none placeholder-slate-400 dark:placeholder-slate-500"
                        required
                      />
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Detailed descriptions help us process your request 50%
                        faster.
                      </p>
                    </div>

                    {/* Transaction Proof */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Transaction Proof (Screenshot) *
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
                          formData.transactionProof
                            ? "border-green-500/30 bg-green-500/5"
                            : "border-slate-300/50 dark:border-slate-700/50 hover:border-amber-500 hover:bg-amber-500/5"
                        }`}
                        onClick={() =>
                          !formData.transactionProof &&
                          fileInputRef.current?.click()
                        }
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleMainProofUpload}
                          accept="image/*"
                          className="hidden"
                        />

                        {formData.transactionProof ? (
                          <div className="space-y-4">
                            <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden border-2 border-amber-500/20 shadow-lg">
                              <img
                                src={getOptimizedCloudinaryUrl(
                                  formData.transactionProof,
                                  {
                                    width: 200,
                                    height: 200,
                                    crop: "fill",
                                    quality: "auto",
                                  }
                                )}
                                alt="Transaction proof"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=400&fit=crop";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                                <span className="text-white text-sm font-medium mb-1">
                                  ✓ Cloudinary Upload
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeImage(0, true)}
                                  className="text-xs text-rose-300 hover:text-white transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-2">
                              {uploading ? (
                                <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                              ) : (
                                <FaReceipt className="text-amber-600 dark:text-amber-400 text-3xl" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-white mb-1">
                                {uploading
                                  ? "Uploading to Cloudinary..."
                                  : "Click to upload proof"}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Screenshot of payment confirmation or
                                transaction ID
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Images */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Additional Images (Optional)
                      </label>
                      <div
                        className="border-2 border-dashed border-slate-300/50 dark:border-slate-700/50 rounded-2xl p-6 text-center hover:border-amber-500 hover:bg-amber-500/5 transition-all duration-300"
                        onClick={() => additionalImagesRef.current?.click()}
                      >
                        <input
                          type="file"
                          ref={additionalImagesRef}
                          onChange={handleAdditionalImages}
                          accept="image/*"
                          multiple
                          className="hidden"
                        />

                        <div className="space-y-4">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 mb-2">
                            <FaCamera className="text-blue-600 dark:text-blue-400 text-2xl" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white mb-1">
                              Upload additional photos
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Show product condition, damage, or other issues
                              (max 5 images)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Preview additional images */}
                      {formData.additionalImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {formData.additionalImages.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={getOptimizedCloudinaryUrl(url, {
                                  width: 200,
                                  height: 150,
                                  crop: "fill",
                                  quality: "auto",
                                })}
                                alt={`Additional ${index + 1}`}
                                className="w-full h-24 rounded-lg object-cover border border-slate-300/50 dark:border-slate-700/50"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=150&fit=crop";
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Terms */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-100/50 to-slate-200/30 dark:from-slate-800/30 dark:to-slate-900/30 border border-slate-300/30 dark:border-slate-700/30">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-amber-500 focus:ring-amber-500/20"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-slate-700 dark:text-slate-300"
                        >
                          I confirm that the item is in its original condition
                          with all packaging and tags. I understand that returns
                          must comply with the 30-day policy and final sale
                          items are not eligible for return.
                        </label>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-700/30">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-700 dark:text-slate-300 font-medium border border-slate-300 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
                        disabled={submitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!isEligible || submitting}
                        className={`flex-1 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                          !isEligible || submitting
                            ? "bg-gradient-to-r from-slate-300 to-slate-400 cursor-not-allowed text-slate-600 dark:text-slate-500"
                            : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 text-white shadow-lg hover:shadow-xl hover:shadow-amber-500/30"
                        }`}
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          "Submit Return Request"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminReturnRequest;
