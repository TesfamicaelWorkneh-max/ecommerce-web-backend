// import multer from "multer";
// import path from "path";
// import { uploadReturnProof, uploadReturnImage } from "./cloudinary.js";

// // Memory storage for Cloudinary
// const memoryStorage = multer.memoryStorage();

// // File filter for images
// const imageFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"));
//   }
// };

// // Create upload instances
// export const uploadReturnProof = multer({
//   storage: memoryStorage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//   fileFilter: imageFilter,
// });

// export const uploadReturnImages = multer({
//   storage: memoryStorage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB per file
//     files: 5, // Max 5 files
//   },
//   fileFilter: imageFilter,
// });

// // Handle single file upload to Cloudinary
// export const handleSingleUpload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file uploaded",
//       });
//     }

//     console.log("📤 Uploading single file to Cloudinary:", {
//       originalname: req.file.originalname,
//       size: req.file.size,
//     });

//     // Upload to Cloudinary
//     const result = await uploadReturnProof(
//       req.file.buffer,
//       req.file.originalname
//     );

//     console.log("✅ Cloudinary upload successful:", {
//       url: result.url.substring(0, 50) + "...",
//     });

//     res.json({
//       success: true,
//       url: result.url,
//       public_id: result.public_id,
//       message: "File uploaded to Cloudinary",
//     });
//   } catch (error) {
//     console.error("❌ Cloudinary upload error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Upload failed to Cloudinary",
//       error: error.message,
//     });
//   }
// };

// // Handle multiple files upload to Cloudinary
// export const handleMultipleUpload = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No files uploaded",
//       });
//     }

//     console.log("📤 Uploading multiple files to Cloudinary:", {
//       count: req.files.length,
//     });

//     // Upload all files to Cloudinary
//     const uploadPromises = req.files.map((file) =>
//       uploadReturnImage(file.buffer, file.originalname)
//     );

//     const results = await Promise.all(uploadPromises);

//     const fileUrls = results.map((result) => ({
//       url: result.url,
//       public_id: result.public_id,
//     }));

//     console.log("✅ Multiple files uploaded to Cloudinary:", {
//       count: fileUrls.length,
//     });

//     res.json({
//       success: true,
//       files: fileUrls,
//       count: fileUrls.length,
//       message: `${fileUrls.length} file(s) uploaded to Cloudinary`,
//     });
//   } catch (error) {
//     console.error("❌ Cloudinary upload error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Upload failed to Cloudinary",
//       error: error.message,
//     });
//   }
// };import multer from "multer";
import path from "path";
import {
  uploadReturnProof as cloudinaryUploadReturnProof,
  uploadReturnImage as cloudinaryUploadReturnImage,
} from "./cloudinary.js";

// Memory storage for Cloudinary
const memoryStorage = multer.memoryStorage();

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Create upload instances
export const uploadReturnProof = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: imageFilter,
});

export const uploadReturnImages = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 5, // Max 5 files
  },
  fileFilter: imageFilter,
});

// Handle single file upload to Cloudinary
export const handleSingleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("📤 Uploading single file to Cloudinary:", {
      originalname: req.file.originalname,
      size: req.file.size,
    });

    // Upload to Cloudinary using the renamed import
    const result = await cloudinaryUploadReturnProof(
      req.file.buffer,
      req.file.originalname
    );

    console.log("✅ Cloudinary upload successful:", {
      url: result.url.substring(0, 50) + "...",
    });

    res.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      message: "File uploaded to Cloudinary",
    });
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed to Cloudinary",
      error: error.message,
    });
  }
};

// Handle multiple files upload to Cloudinary
export const handleMultipleUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    console.log("📤 Uploading multiple files to Cloudinary:", {
      count: req.files.length,
    });

    // Upload all files to Cloudinary using the renamed import
    const uploadPromises = req.files.map((file) =>
      cloudinaryUploadReturnImage(file.buffer, file.originalname)
    );

    const results = await Promise.all(uploadPromises);

    const fileUrls = results.map((result) => ({
      url: result.url,
      public_id: result.public_id,
    }));

    console.log("✅ Multiple files uploaded to Cloudinary:", {
      count: fileUrls.length,
    });

    res.json({
      success: true,
      files: fileUrls,
      count: fileUrls.length,
      message: `${fileUrls.length} file(s) uploaded to Cloudinary`,
    });
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed to Cloudinary",
      error: error.message,
    });
  }
};
