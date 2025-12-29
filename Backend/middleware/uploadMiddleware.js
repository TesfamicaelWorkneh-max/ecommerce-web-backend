import multer from "multer";
import path from "path";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

// Memory storage - no disk writes
const storage = multer.memoryStorage();

// File filter
export const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, webp, gif)"));
  }
};

// Multer instance
export const upload = multer({
  storage,
  limits: {
    fileSize: 1000 * 1024 * 1024, // 30MB
    fieldSize: 1000 * 1024 * 1024,
    files: 5, // Max 5 files
  },
  fileFilter,
});

// Cloudinary upload middleware
export const uploadToCloudinary = (
  folder = "products",
  fieldName = "image"
) => {
  return [
    // Multer middleware
    fieldName === "multiple"
      ? upload.array("images", 10)
      : upload.single(fieldName),

    // Cloudinary upload middleware
    async (req, res, next) => {
      try {
        if (!req.file && !req.files) {
          return next();
        }

        // Single file upload
        if (req.file) {
          const result = await uploadBufferToCloudinary(
            req.file.buffer,
            req.file.originalname,
            folder
          );
          req.cloudinaryResult = result;
          req.imageUrl = result.url;
        }

        // Multiple files upload
        if (req.files && Array.isArray(req.files)) {
          const uploadPromises = req.files.map((file) =>
            uploadBufferToCloudinary(file.buffer, file.originalname, folder)
          );

          const results = await Promise.all(uploadPromises);
          req.cloudinaryResults = results;
          req.imageUrls = results.map((r) => r.url);
        }

        next();
      } catch (error) {
        console.error("Cloudinary upload middleware error:", error);
        res.status(500).json({
          success: false,
          message: "Image upload failed",
          error:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        });
      }
    },
  ];
};

// export { upload, uploadToCloudinary };
