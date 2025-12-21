import multer from "multer";
import path from "path";
import fs from "fs";

// Create separate folders for different upload types
const createUploadFolder = (folderName) => {
  const uploadPath = `uploads/${folderName}`;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  return uploadPath;
};

// Storage configuration for return proofs
const returnProofStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = createUploadFolder("return-proofs");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `return-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Storage for additional return images
const returnImagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = createUploadFolder("return-images");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `return-img-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter for images only
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
  storage: returnProofStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter,
});

export const uploadReturnImages = multer({
  storage: returnImagesStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: imageFilter,
});

// Handle single file upload
export const handleSingleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Generate URL based on your server setup
    const fileUrl = `/uploads/return-proofs/${req.file.filename}`;

    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      message: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

// Handle multiple files upload
export const handleMultipleUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const fileUrls = req.files.map((file) => ({
      url: `/uploads/return-images/${file.filename}`,
      filename: file.filename,
    }));

    res.json({
      success: true,
      files: fileUrls,
      count: fileUrls.length,
      message: `${fileUrls.length} file(s) uploaded successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};
