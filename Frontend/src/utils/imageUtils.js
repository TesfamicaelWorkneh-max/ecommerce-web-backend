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

// Main function to get image URL
export const getImageUrl = (image, options = {}) => {
  // Handle empty/null image
  if (!image) {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
  }

  // Handle object
  if (typeof image === "object") {
    image = image.url || image.path || "";
  }

  // Not a string
  if (typeof image !== "string") {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
  }

  // Already full URL (including Cloudinary)
  if (image.startsWith("http")) {
    // Optimize Cloudinary URLs
    if (image.includes("cloudinary.com")) {
      return optimizeCloudinaryUrl(image, options);
    }
    return image;
  }

  // Local file path (legacy - during migration)
  const cleanPath = image.replace(/\\/g, "/").startsWith("/")
    ? image.replace(/\\/g, "/")
    : `/${image.replace(/\\/g, "/")}`;

  return `${BACKEND_URL}${cleanPath}`;
};

// Get different sizes
export const getImageSizes = (image) => {
  return {
    original: getImageUrl(image),
    thumbnail: getImageUrl(image, { width: 150, height: 150, crop: "fill" }),
    medium: getImageUrl(image, { width: 400, height: 400, crop: "limit" }),
    large: getImageUrl(image, { width: 800, height: 800, crop: "limit" }),
  };
};

// Get product image
export const getProductImage = (product) => {
  if (!product) return getImageUrl(null);
  const imagePath = product.images?.[0] || product.image;
  return getImageUrl(imagePath);
};

// Check if URL is Cloudinary
export const isCloudinaryUrl = (url) => {
  return url && typeof url === "string" && url.includes("cloudinary.com");
};

export default getImageUrl;
