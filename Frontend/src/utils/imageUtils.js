// const BACKEND_URL = import.meta.env.VITE_API_URL;

// // Optimize Cloudinary URL with transformations
// const optimizeCloudinaryUrl = (url, options = {}) => {
//   if (!url || !url.includes("cloudinary.com")) return url;

//   const {
//     width,
//     height,
//     crop = "fill",
//     quality = "auto",
//     format = "auto",
//   } = options;

//   // Split the URL at /upload/
//   const parts = url.split("/upload/");
//   if (parts.length !== 2) return url;

//   const baseUrl = parts[0] + "/upload/";
//   const imagePath = parts[1];

//   // Build transformations
//   let transformations = "";

//   if (width || height) {
//     transformations += `c_${crop},`;
//     if (width) transformations += `w_${width},`;
//     if (height) transformations += `h_${height},`;
//   }

//   if (quality) transformations += `q_${quality},`;
//   if (format) transformations += `f_${format},`;

//   // Remove trailing comma
//   if (transformations.endsWith(",")) {
//     transformations = transformations.slice(0, -1);
//   }

//   // Add transformations if any
//   if (transformations) {
//     transformations += "/";
//   }

//   return `${baseUrl}${transformations}${imagePath}`;
// };

// // Main function to get image URL
// export const getImageUrl = (image, options = {}) => {
//   // Handle empty/null image
//   if (!image) {
//     return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
//   }

//   // Handle object
//   if (typeof image === "object") {
//     image = image.url || image.path || "";
//   }

//   // Not a string
//   if (typeof image !== "string") {
//     return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
//   }

//   // Already full URL (including Cloudinary)
//   if (image.startsWith("http")) {
//     // Optimize Cloudinary URLs
//     if (image.includes("cloudinary.com")) {
//       return optimizeCloudinaryUrl(image, options);
//     }
//     return image;
//   }

//   // Local file path (legacy - during migration)
//   const cleanPath = image.replace(/\\/g, "/").startsWith("/")
//     ? image.replace(/\\/g, "/")
//     : `/${image.replace(/\\/g, "/")}`;

//   return `${BACKEND_URL}${cleanPath}`;
// };

// // Get different sizes
// export const getImageSizes = (image) => {
//   return {
//     original: getImageUrl(image),
//     thumbnail: getImageUrl(image, { width: 150, height: 150, crop: "fill" }),
//     medium: getImageUrl(image, { width: 400, height: 400, crop: "limit" }),
//     large: getImageUrl(image, { width: 800, height: 800, crop: "limit" }),
//   };
// };

// // Get product image
// export const getProductImage = (product) => {
//   if (!product) return getImageUrl(null);
//   const imagePath = product.images?.[0] || product.image;
//   return getImageUrl(imagePath);
// };

// // Check if URL is Cloudinary
// export const isCloudinaryUrl = (url) => {
//   return url && typeof url === "string" && url.includes("cloudinary.com");
// };

// export default getImageUrl;
// ❌ BACKEND_URL is NO LONGER needed for images
// const BACKEND_URL = import.meta.env.VITE_API_URL;

// Optimize Cloudinary URL with transformations
const BACKEND_URL = import.meta.env.VITE_API_URL;

// Optimize Cloudinary URL with transformations
const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes("cloudinary.com")) return url;

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

  if (transformations.endsWith(","))
    transformations = transformations.slice(0, -1);

  if (transformations) transformations += "/";

  return `${baseUrl}${transformations}${imagePath}`;
};

// ✅ Safe fallback
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9";

// Main function to get image URL
export const getImageUrl = (image, options = {}) => {
  if (!image) return FALLBACK_IMAGE;

  // 🔥 Handle objects with any common field
  if (typeof image === "object") {
    image = image.imageUrl || image.image || image.url || image.path || "";
  }

  if (typeof image !== "string" || !image) return FALLBACK_IMAGE;

  // Cloudinary image
  if (image.startsWith("https://res.cloudinary.com")) {
    return optimizeCloudinaryUrl(image, options);
  }

  // Full HTTP URL (non-Cloudinary)
  if (image.startsWith("http")) return image;

  // Local path (legacy)
  const cleanPath = image.replace(/\\/g, "/").startsWith("/")
    ? image.replace(/\\/g, "/")
    : `/${image.replace(/\\/g, "/")}`;

  return `${BACKEND_URL}${cleanPath}`;
};

// Get different sizes
export const getImageSizes = (image) => ({
  original: getImageUrl(image),
  thumbnail: getImageUrl(image, { width: 150, height: 150, crop: "fill" }),
  medium: getImageUrl(image, { width: 400, height: 400, crop: "limit" }),
  large: getImageUrl(image, { width: 800, height: 800, crop: "limit" }),
});

// Get product image
export const getProductImage = (product) => {
  if (!product) return getImageUrl(null);
  const imagePath = product.images?.[0] || product.image || product.imageUrl;
  return getImageUrl(imagePath);
};

// Check if URL is Cloudinary
export const isCloudinaryUrl = (url) =>
  url &&
  typeof url === "string" &&
  url.startsWith("https://res.cloudinary.com");

// Get hero image safely
export const getHeroImage = (hero) => {
  if (!hero) return getImageUrl(null);
  // Use imageUrl field
  return getImageUrl(hero.imageUrl);
};

// Get category image safely
// Returns a safe URL for hero or category images
export const getCategoryImage = (image) => {
  return (
    getImageUrl(image) ||
    "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
  );
};

export default getImageUrl;
