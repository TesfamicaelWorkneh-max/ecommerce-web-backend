// // utils/cloudinary.js
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import path from "path";

// // Configure Cloudinary (already done in server.js, but keep for safety)
// const configureCloudinary = () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true,
//   });
// };

// // Initialize on module load
// configureCloudinary();

// // Generate optimized URL
// export const generateCloudinaryUrl = (publicId, options = {}) => {
//   if (!publicId) return getFallbackUrl();

//   const defaultOptions = {
//     width: 800,
//     height: 800,
//     crop: "limit",
//     quality: "auto",
//     fetch_format: "auto",
//     ...options,
//   };

//   return cloudinary.url(publicId, defaultOptions);
// };

// // Upload from file path
// export const uploadToCloudinary = async (filePath, folder = "products") => {
//   try {
//     // Check if file exists
//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File not found: ${filePath}`);
//     }

//     const result = await cloudinary.uploader.upload(filePath, {
//       folder,
//       resource_type: "auto",
//       transformation: [
//         { width: 1200, height: 1200, crop: "limit" },
//         { quality: "auto:good" },
//         { fetch_format: "auto" },
//       ],
//     });

//     // Clean up local file
//     try {
//       fs.unlinkSync(filePath);
//     } catch (cleanupError) {
//       console.warn("Could not delete local file:", cleanupError.message);
//     }

//     return {
//       url: result.secure_url,
//       public_id: result.public_id,
//       format: result.format,
//       width: result.width,
//       height: result.height,
//       bytes: result.bytes,
//       path: result.secure_url, // For backward compatibility
//     };
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw new Error(`Upload failed: ${error.message}`);
//   }
// };

// // Upload buffer (for multer memory storage)
// export const uploadBufferToCloudinary = async (
//   buffer,
//   originalname,
//   folder = "products"
// ) => {
//   try {
//     return new Promise((resolve, reject) => {
//       const uploadOptions = {
//         folder,
//         resource_type: "auto",
//         transformation: [
//           { width: 1200, height: 1200, crop: "limit" },
//           { quality: "auto:good" },
//           { fetch_format: "auto" },
//         ],
//         filename_override: originalname,
//         use_filename: true,
//         unique_filename: true,
//       };

//       const stream = cloudinary.uploader.upload_stream(
//         uploadOptions,
//         (error, result) => {
//           if (error) {
//             console.error("Cloudinary stream error:", error);
//             reject(error);
//           } else {
//             resolve({
//               url: result.secure_url,
//               public_id: result.public_id,
//               format: result.format,
//               width: result.width,
//               height: result.height,
//               bytes: result.bytes,
//               path: result.secure_url,
//               original_filename: originalname,
//             });
//           }
//         }
//       );

//       stream.end(buffer);
//     });
//   } catch (error) {
//     console.error("Cloudinary buffer upload error:", error);
//     throw error;
//   }
// };

// // Delete from Cloudinary
// export const deleteFromCloudinary = async (urlOrPublicId) => {
//   try {
//     if (!urlOrPublicId) return false;

//     let publicId = urlOrPublicId;

//     // Extract public_id from Cloudinary URL
//     if (urlOrPublicId.includes("res.cloudinary.com")) {
//       const urlParts = urlOrPublicId.split("/");
//       const uploadIndex = urlParts.indexOf("upload");

//       if (uploadIndex !== -1) {
//         const versionIndex = uploadIndex + 1;
//         const publicIdParts = urlParts.slice(versionIndex + 1);
//         publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");
//       }
//     }

//     // Remove version prefix if present
//     publicId = publicId.replace(/^v\d+\//, "");

//     const result = await cloudinary.uploader.destroy(publicId);
//     return result.result === "ok";
//   } catch (error) {
//     console.error("Cloudinary delete error:", error);
//     return false;
//   }
// };

// // Check if URL is from Cloudinary
// export const isCloudinaryUrl = (url) => {
//   return url && typeof url === "string" && url.includes("res.cloudinary.com");
// };

// // Get optimized image URL
// export const getOptimizedImageUrl = (imageUrl, options = {}) => {
//   if (!imageUrl || typeof imageUrl !== "string") {
//     return getFallbackUrl();
//   }

//   // If it's a Cloudinary URL, apply transformations
//   if (isCloudinaryUrl(imageUrl)) {
//     try {
//       const urlParts = imageUrl.split("/");
//       const uploadIndex = urlParts.indexOf("upload");

//       if (uploadIndex !== -1) {
//         const versionIndex = uploadIndex + 1;
//         const publicIdParts = urlParts.slice(versionIndex + 1);
//         const publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");

//         return generateCloudinaryUrl(publicId, options);
//       }
//     } catch (error) {
//       console.error("Error parsing Cloudinary URL:", error);
//     }
//   }

//   // Return original URL for non-Cloudinary images
//   return imageUrl;
// };

// // Normalize image for frontend
// export const normalizeImage = (img) => {
//   if (!img) return getFallbackUrl();

//   // Handle object
//   if (typeof img === "object") {
//     img = img.url || img.path || "";
//   }

//   if (typeof img !== "string") {
//     return getFallbackUrl();
//   }

//   // Already a full URL
//   if (img.startsWith("http")) {
//     // Optimize Cloudinary URLs
//     if (isCloudinaryUrl(img)) {
//       return getOptimizedImageUrl(img, {
//         width: 800,
//         height: 800,
//         crop: "fill",
//         quality: "auto",
//         fetch_format: "auto",
//       });
//     }
//     return img;
//   }

//   // Local file path - convert to URL
//   const cleanPath = img.replace(/\\/g, "/").startsWith("/")
//     ? img.replace(/\\/g, "/")
//     : `/${img.replace(/\\/g, "/")}`;

//   // In development, serve from local server
//   if (process.env.NODE_ENV === "development") {
//     return `http://localhost:3000${cleanPath}`;
//   }

//   // In production, return fallback for unmigrated images
//   return getFallbackUrl();
// };

// // Fallback image
// export const getFallbackUrl = () => {
//   return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
// };

// // Extract public ID from Cloudinary URL
// export const extractPublicId = (cloudinaryUrl) => {
//   if (!isCloudinaryUrl(cloudinaryUrl)) return null;

//   const urlParts = cloudinaryUrl.split("/");
//   const uploadIndex = urlParts.indexOf("upload");

//   if (uploadIndex !== -1) {
//     const versionIndex = uploadIndex + 1;
//     const publicIdParts = urlParts.slice(versionIndex + 1);
//     return publicIdParts.join("/").replace(/\.[^/.]+$/, "");
//   }

//   return null;
// };

// test - cloudinary.js;

// backend/utils/cloudinary.js
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import path from "path";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// // Upload from file path
// export const uploadToCloudinary = async (filePath, folder = "products") => {
//   try {
//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File not found: ${filePath}`);
//     }

//     const result = await cloudinary.uploader.upload(filePath, {
//       folder,
//       resource_type: "auto",
//       transformation: [
//         { width: 1200, height: 1200, crop: "limit" },
//         { quality: "auto:good" },
//         { fetch_format: "auto" },
//       ],
//     });

//     // Clean up local file
//     try {
//       fs.unlinkSync(filePath);
//     } catch (cleanupError) {
//       console.warn("Could not delete local file:", cleanupError.message);
//     }

//     return {
//       url: result.secure_url,
//       public_id: result.public_id,
//       format: result.format,
//       width: result.width,
//       height: result.height,
//       bytes: result.bytes,
//       path: result.secure_url,
//     };
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw new Error(`Upload failed: ${error.message}`);
//   }
// };

// // Upload buffer (for multer memory storage)
// export const uploadBufferToCloudinary = async (
//   buffer,
//   originalname,
//   folder = "products"
// ) => {
//   try {
//     return new Promise((resolve, reject) => {
//       const uploadOptions = {
//         folder,
//         resource_type: "auto",
//         transformation: [
//           { width: 1200, height: 1200, crop: "limit" },
//           { quality: "auto:good" },
//           { fetch_format: "auto" },
//         ],
//         filename_override: originalname,
//         use_filename: true,
//         unique_filename: true,
//       };

//       const stream = cloudinary.uploader.upload_stream(
//         uploadOptions,
//         (error, result) => {
//           if (error) {
//             console.error("Cloudinary stream error:", error);
//             reject(error);
//           } else {
//             resolve({
//               url: result.secure_url,
//               public_id: result.public_id,
//               format: result.format,
//               width: result.width,
//               height: result.height,
//               bytes: result.bytes,
//               path: result.secure_url,
//               original_filename: originalname,
//             });
//           }
//         }
//       );

//       stream.end(buffer);
//     });
//   } catch (error) {
//     console.error("Cloudinary buffer upload error:", error);
//     throw error;
//   }
// };

// // Delete from Cloudinary
// export const deleteFromCloudinary = async (urlOrPublicId) => {
//   try {
//     if (!urlOrPublicId) return false;

//     let publicId = urlOrPublicId;

//     // Extract public_id from Cloudinary URL
//     if (urlOrPublicId.includes("res.cloudinary.com")) {
//       const urlParts = urlOrPublicId.split("/");
//       const uploadIndex = urlParts.indexOf("upload");

//       if (uploadIndex !== -1) {
//         const versionIndex = uploadIndex + 1;
//         const publicIdParts = urlParts.slice(versionIndex + 1);
//         publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");
//       }
//     }

//     // Remove version prefix if present
//     publicId = publicId.replace(/^v\d+\//, "");

//     const result = await cloudinary.uploader.destroy(publicId);
//     return result.result === "ok";
//   } catch (error) {
//     console.error("Cloudinary delete error:", error);
//     return false;
//   }
// };

// // Check if URL is from Cloudinary
// export const isCloudinaryUrl = (url) => {
//   return url && typeof url === "string" && url.includes("res.cloudinary.com");
// };

// // Simple normalizeImage for backend (different from frontend)
// export const normalizeImageForBackend = (img) => {
//   if (!img) return getFallbackUrl();

//   if (typeof img === "object") {
//     img = img.url || img.path || "";
//   }

//   if (typeof img !== "string") {
//     return getFallbackUrl();
//   }

//   // Already a full URL
//   if (img.startsWith("http")) {
//     return img;
//   }

//   // Local file path - convert to URL
//   const cleanPath = img.replace(/\\/g, "/").startsWith("/")
//     ? img.replace(/\\/g, "/")
//     : `/${img.replace(/\\/g, "/")}`;

//   return `http://localhost:3000${cleanPath}`;
// };

// // Fallback image
// export const getFallbackUrl = () => {
//   return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
// };

// // Extract public ID from Cloudinary URL
// export const extractPublicId = (cloudinaryUrl) => {
//   if (!isCloudinaryUrl(cloudinaryUrl)) return null;

//   const urlParts = cloudinaryUrl.split("/");
//   const uploadIndex = urlParts.indexOf("upload");

//   if (uploadIndex !== -1) {
//     const versionIndex = uploadIndex + 1;
//     const publicIdParts = urlParts.slice(versionIndex + 1);
//     return publicIdParts.join("/").replace(/\.[^/.]+$/, "");
//   }

//   return null;
// };

// export default {
//   uploadToCloudinary,
//   uploadBufferToCloudinary,
//   deleteFromCloudinary,
//   isCloudinaryUrl,
//   normalizeImageForBackend,
//   getFallbackUrl,
//   extractPublicId,
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
