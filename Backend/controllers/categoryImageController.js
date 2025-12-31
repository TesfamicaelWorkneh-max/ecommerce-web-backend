import Category from "../models/Category.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

/**
 * Upload category image
 * Used by admin while creating or editing category
 */
export const uploadCategoryImage = async (req, res) => {
  try {
    if (!req.cloudinaryResult) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category image uploaded successfully",
      image: {
        url: req.cloudinaryResult.url,
        public_id: req.cloudinaryResult.public_id,
      },
    });
  } catch (error) {
    console.error("Upload category image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload category image",
    });
  }
};

/**
 * Delete category image (optional but professional)
 */
export const deleteCategoryImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "public_id is required",
      });
    }

    const deleted = await deleteFromCloudinary(public_id);

    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete image from Cloudinary",
      });
    }

    res.json({
      success: true,
      message: "Category image deleted successfully",
    });
  } catch (error) {
    console.error("Delete category image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category image",
    });
  }
};
