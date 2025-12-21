// // import { v2 as cloudinary } from "cloudinary";
// // import fs from "fs";
// // import path from "path";

// // // Configure Cloudinary
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// //   secure: true,
// // });

// // // Upload from file path
// // export const uploadToCloudinary = async (filePath, folder = "products") => {
// //   try {
// //     if (!fs.existsSync(filePath)) {
// //       throw new Error(`File not found: ${filePath}`);
// //     }

// //     const result = await cloudinary.uploader.upload(filePath, {
// //       folder,
// //       resource_type: "auto",
// //       transformation: [
// //         { width: 1200, height: 1200, crop: "limit" },
// //         { quality: "auto:good" },
// //         { fetch_format: "auto" },
// //       ],
// //     });

// //     // Clean up local file
// //     try {
// //       fs.unlinkSync(filePath);
// //     } catch (cleanupError) {
// //       console.warn("Could not delete local file:", cleanupError.message);
// //     }

// //     return {
// //       url: result.secure_url,
// //       public_id: result.public_id,
// //       format: result.format,
// //       width: result.width,
// //       height: result.height,
// //       bytes: result.bytes,
// //       path: result.secure_url,
// //     };
// //   } catch (error) {
// //     console.error("Cloudinary upload error:", error);
// //     throw new Error(`Upload failed: ${error.message}`);
// //   }
// // };

// // // Upload buffer (for multer memory storage)
// // export const uploadBufferToCloudinary = async (
// //   buffer,
// //   originalname,
// //   folder = "products"
// // ) => {
// //   try {
// //     return new Promise((resolve, reject) => {
// //       const uploadOptions = {
// //         folder,
// //         resource_type: "auto",
// //         transformation: [
// //           { width: 1200, height: 1200, crop: "limit" },
// //           { quality: "auto:good" },
// //           { fetch_format: "auto" },
// //         ],
// //         filename_override: originalname,
// //         use_filename: true,
// //         unique_filename: true,
// //       };

// //       const stream = cloudinary.uploader.upload_stream(
// //         uploadOptions,
// //         (error, result) => {
// //           if (error) {
// //             console.error("Cloudinary stream error:", error);
// //             reject(error);
// //           } else {
// //             resolve({
// //               url: result.secure_url,
// //               public_id: result.public_id,
// //               format: result.format,
// //               width: result.width,
// //               height: result.height,
// //               bytes: result.bytes,
// //               path: result.secure_url,
// //               original_filename: originalname,
// //             });
// //           }
// //         }
// //       );

// //       stream.end(buffer);
// //     });
// //   } catch (error) {
// //     console.error("Cloudinary buffer upload error:", error);
// //     throw error;
// //   }
// // };

// // // Delete from Cloudinary
// // export const deleteFromCloudinary = async (urlOrPublicId) => {
// //   try {
// //     if (!urlOrPublicId) return false;

// //     let publicId = urlOrPublicId;

// //     // Extract public_id from Cloudinary URL
// //     if (urlOrPublicId.includes("res.cloudinary.com")) {
// //       const urlParts = urlOrPublicId.split("/");
// //       const uploadIndex = urlParts.indexOf("upload");

// //       if (uploadIndex !== -1) {
// //         const versionIndex = uploadIndex + 1;
// //         const publicIdParts = urlParts.slice(versionIndex + 1);
// //         publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");
// //       }
// //     }

// //     // Remove version prefix if present
// //     publicId = publicId.replace(/^v\d+\//, "");

// //     const result = await cloudinary.uploader.destroy(publicId);
// //     return result.result === "ok";
// //   } catch (error) {
// //     console.error("Cloudinary delete error:", error);
// //     return false;
// //   }
// // };

// // // Check if URL is from Cloudinary
// // export const isCloudinaryUrl = (url) => {
// //   return url && typeof url === "string" && url.includes("res.cloudinary.com");
// // };

// // // Simple normalizeImage for backend (different from frontend)
// // export const normalizeImageForBackend = (img) => {
// //   if (!img) return getFallbackUrl();

// //   if (typeof img === "object") {
// //     img = img.url || img.path || "";
// //   }

// //   if (typeof img !== "string") {
// //     return getFallbackUrl();
// //   }

// //   // Already a full URL
// //   if (img.startsWith("http")) {
// //     return img;
// //   }

// //   // Local file path - convert to URL
// //   const cleanPath = img.replace(/\\/g, "/").startsWith("/")
// //     ? img.replace(/\\/g, "/")
// //     : `/${img.replace(/\\/g, "/")}`;

// //   return `http://localhost:3000${cleanPath}`;
// // };

// // // Fallback image
// // export const getFallbackUrl = () => {
// //   return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
// // };

// // // Extract public ID from Cloudinary URL
// // export const extractPublicId = (cloudinaryUrl) => {
// //   if (!isCloudinaryUrl(cloudinaryUrl)) return null;

// //   const urlParts = cloudinaryUrl.split("/");
// //   const uploadIndex = urlParts.indexOf("upload");

// //   if (uploadIndex !== -1) {
// //     const versionIndex = uploadIndex + 1;
// //     const publicIdParts = urlParts.slice(versionIndex + 1);
// //     return publicIdParts.join("/").replace(/\.[^/.]+$/, "");
// //   }

// //   return null;
// // };

// // // ================ RETURN SPECIFIC FUNCTIONS ================

// // // Upload return proof
// // // cloudinary.js
// // export const uploadReturnProofToCloudinary = async (buffer, originalname) => {
// //   return await uploadBufferToCloudinary(buffer, originalname, "returns/proofs");
// // };

// // export const uploadReturnImageToCloudinary = async (buffer, originalname) => {
// //   return await uploadBufferToCloudinary(buffer, originalname, "returns/images");
// // };

// // // Upload return from file path
// // export const uploadReturnProofFromPath = async (filePath) => {
// //   return await uploadToCloudinary(filePath, "returns/proofs");
// // };

// // export const uploadReturnImageFromPath = async (filePath) => {
// //   return await uploadToCloudinary(filePath, "returns/images");
// // };

// // // Helper to validate Cloudinary URL
// // export const validateCloudinaryUrl = (url) => {
// //   return url && typeof url === "string" && url.includes("res.cloudinary.com");
// // };

// // // Get optimized Cloudinary URL
// // export const getOptimizedCloudinaryUrl = (url, options = {}) => {
// //   if (!validateCloudinaryUrl(url)) return url;

// //   const {
// //     width,
// //     height,
// //     crop = "fill",
// //     quality = "auto",
// //     format = "auto",
// //   } = options;

// //   const parts = url.split("/upload/");
// //   if (parts.length !== 2) return url;

// //   const baseUrl = parts[0] + "/upload/";
// //   const imagePath = parts[1];

// //   let transformations = "";

// //   if (width || height) {
// //     transformations += `c_${crop},`;
// //     if (width) transformations += `w_${width},`;
// //     if (height) transformations += `h_${height},`;
// //   }

// //   if (quality) transformations += `q_${quality},`;
// //   if (format) transformations += `f_${format},`;

// //   if (transformations.endsWith(",")) {
// //     transformations = transformations.slice(0, -1);
// //   }

// //   if (transformations) {
// //     transformations += "/";
// //   }

// //   return `${baseUrl}${transformations}${imagePath}`;
// // };

// // export default {
// //   uploadToCloudinary,
// //   uploadBufferToCloudinary,
// //   deleteFromCloudinary,
// //   isCloudinaryUrl,
// //   normalizeImageForBackend,
// //   getFallbackUrl,
// //   extractPublicId,
// //   // New exports for returns
// //   uploadReturnProof,
// //   uploadReturnImage,
// //   uploadReturnProofFromPath,
// //   uploadReturnImageFromPath,
// //   validateCloudinaryUrl,
// //   getOptimizedCloudinaryUrl,
// // };
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Upload buffer to Cloudinary
// const uploadBufferToCloudinary = (buffer, filename, folder = "returns") => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: folder,
//         public_id: filename.replace(/\.[^/.]+$/, ""),
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//     uploadStream.end(buffer);
//   });
// };

// // Single file upload to Cloudinary
// export const uploadReturnProof = async (buffer, filename) => {
//   return uploadBufferToCloudinary(buffer, filename, "return-proofs");
// };

// // Multiple files upload to Cloudinary
// export const uploadReturnImage = async (buffer, filename) => {
//   return uploadBufferToCloudinary(buffer, filename, "return-images");
// };

// // Delete from Cloudinary
// export const deleteFromCloudinary = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     return result;
//   } catch (error) {
//     throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
//   }
// };
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload from file path
export const uploadToCloudinary = async (filePath, folder = "products") => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
    });

    // Clean up local file
    try {
      fs.unlinkSync(filePath);
    } catch (cleanupError) {
      console.warn("Could not delete local file:", cleanupError.message);
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      path: result.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Upload buffer (for multer memory storage)
export const uploadBufferToCloudinary = async (
  buffer,
  originalname,
  folder = "products"
) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder,
        resource_type: "auto",
        transformation: [
          { width: 1200, height: 1200, crop: "limit" },
          { quality: "auto:good" },
          { fetch_format: "auto" },
        ],
        filename_override: originalname,
        use_filename: true,
        unique_filename: true,
      };

      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary stream error:", error);
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
              width: result.width,
              height: result.height,
              bytes: result.bytes,
              path: result.secure_url,
              original_filename: originalname,
            });
          }
        }
      );

      stream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary buffer upload error:", error);
    throw error;
  }
};

// Delete from Cloudinary
export const deleteFromCloudinary = async (urlOrPublicId) => {
  try {
    if (!urlOrPublicId) return false;

    let publicId = urlOrPublicId;

    // Extract public_id from Cloudinary URL
    if (urlOrPublicId.includes("res.cloudinary.com")) {
      const urlParts = urlOrPublicId.split("/");
      const uploadIndex = urlParts.indexOf("upload");

      if (uploadIndex !== -1) {
        const versionIndex = uploadIndex + 1;
        const publicIdParts = urlParts.slice(versionIndex + 1);
        publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");
      }
    }

    // Remove version prefix if present
    publicId = publicId.replace(/^v\d+\//, "");

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
};

// Check if URL is from Cloudinary
export const isCloudinaryUrl = (url) => {
  return url && typeof url === "string" && url.includes("res.cloudinary.com");
};

// Simple normalizeImage for backend (different from frontend)
export const normalizeImageForBackend = (img) => {
  if (!img) return getFallbackUrl();

  if (typeof img === "object") {
    img = img.url || img.path || "";
  }

  if (typeof img !== "string") {
    return getFallbackUrl();
  }

  // Already a full URL
  if (img.startsWith("http")) {
    return img;
  }

  // Local file path - convert to URL
  const cleanPath = img.replace(/\\/g, "/").startsWith("/")
    ? img.replace(/\\/g, "/")
    : `/${img.replace(/\\/g, "/")}`;

  return `http://localhost:3000${cleanPath}`;
};

// Fallback image
export const getFallbackUrl = () => {
  return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl) => {
  if (!isCloudinaryUrl(cloudinaryUrl)) return null;

  const urlParts = cloudinaryUrl.split("/");
  const uploadIndex = urlParts.indexOf("upload");

  if (uploadIndex !== -1) {
    const versionIndex = uploadIndex + 1;
    const publicIdParts = urlParts.slice(versionIndex + 1);
    return publicIdParts.join("/").replace(/\.[^/.]+$/, "");
  }

  return null;
};

// ================ RETURN SPECIFIC FUNCTIONS ================

// Upload return proof
export const uploadReturnProof = async (buffer, originalname) => {
  return await uploadBufferToCloudinary(buffer, originalname, "returns/proofs");
};

export const uploadReturnImage = async (buffer, originalname) => {
  return await uploadBufferToCloudinary(buffer, originalname, "returns/images");
};

// Upload return from file path
export const uploadReturnProofFromPath = async (filePath) => {
  return await uploadToCloudinary(filePath, "returns/proofs");
};

export const uploadReturnImageFromPath = async (filePath) => {
  return await uploadToCloudinary(filePath, "returns/images");
};

// Helper to validate Cloudinary URL
export const validateCloudinaryUrl = (url) => {
  return url && typeof url === "string" && url.includes("res.cloudinary.com");
};

// Get optimized Cloudinary URL
export const getOptimizedCloudinaryUrl = (url, options = {}) => {
  if (!validateCloudinaryUrl(url)) return url;

  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  const baseUrl = parts[0] + "/upload/";
  const imagePath = parts[1];

  let transformations = "";

  if (width || height) {
    transformations += `c_${crop},`;
    if (width) transformations += `w_${width},`;
    if (height) transformations += `h_${height},`;
  }

  if (quality) transformations += `q_${quality},`;
  if (format) transformations += `f_${format},`;

  if (transformations.endsWith(",")) {
    transformations = transformations.slice(0, -1);
  }

  if (transformations) {
    transformations += "/";
  }

  return `${baseUrl}${transformations}${imagePath}`;
};

export default {
  uploadToCloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
  isCloudinaryUrl,
  normalizeImageForBackend,
  getFallbackUrl,
  extractPublicId,
  // New exports for returns
  uploadReturnProof,
  uploadReturnImage,
  uploadReturnProofFromPath,
  uploadReturnImageFromPath,
  validateCloudinaryUrl,
  getOptimizedCloudinaryUrl,
};
