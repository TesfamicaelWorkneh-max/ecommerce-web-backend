import {
  handleSingleUpload as uploadSingleFile,
  handleMultipleUpload as uploadMultipleFiles,
} from "../utils/returnUploadsUtils.js";

export const handleSingleUpload = uploadSingleFile;
export const handleMultipleUpload = uploadMultipleFiles;

// Add any additional upload-related controller functions here
export const deleteUploadedFile = async (req, res) => {
  try {
    const { filename, folder } = req.body;

    if (!filename || !folder) {
      return res.status(400).json({
        success: false,
        message: "Filename and folder are required",
      });
    }

    const fs = await import("fs");
    const path = await import("path");

    const filePath = path.join(process.cwd(), "uploads", folder, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({
        success: true,
        message: "File deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

export const getUploadStats = async (req, res) => {
  try {
    const fs = await import("fs");
    const path = await import("path");

    const uploadDirs = ["return-proofs", "return-images"];
    const stats = {};

    for (const dir of uploadDirs) {
      const dirPath = path.join(process.cwd(), "uploads", dir);
      stats[dir] = { count: 0, totalSize: 0 };

      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        stats[dir].count = files.length;

        let totalSize = 0;
        files.forEach((file) => {
          try {
            const filePath = path.join(dirPath, file);
            const fileStat = fs.statSync(filePath);
            totalSize += fileStat.size;
          } catch (err) {
            console.error(`Error reading file ${file}:`, err);
          }
        });
        stats[dir].totalSize = totalSize;
      }
    }

    res.json({
      success: true,
      data: stats,
      message: "Upload statistics retrieved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get upload stats",
      error: error.message,
    });
  }
};
