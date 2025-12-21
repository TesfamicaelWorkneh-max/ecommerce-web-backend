// // backend/migrateImages.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// import Product from "./models/Products.model.js";
// import fs from "fs";
// import path from "path";

// // Load environment variables
// dotenv.config();

// console.log("🔧 Cloudinary Configuration Check:");
// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ Missing");
// console.log(
//   "API Secret:",
//   process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ Missing"
// );

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// console.log("\n📁 File Locations:");
// console.log("Current Directory:", process.cwd());
// console.log("Uploads Path:", path.join(process.cwd(), "uploads", "products"));

// const MONGODB_URI =
//   process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/ecommerce";

// async function uploadImage(filePath) {
//   try {
//     console.log(`   Uploading: ${path.basename(filePath)}`);

//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "products",
//       resource_type: "auto",
//       transformation: [
//         { width: 1200, height: 1200, crop: "limit" },
//         { quality: "auto:good" },
//         { fetch_format: "auto" },
//       ],
//     });

//     console.log(`   ✅ Uploaded to Cloudinary`);
//     console.log(`   🔗 URL: ${result.secure_url.substring(0, 80)}...`);

//     // Delete local file
//     fs.unlinkSync(filePath);
//     console.log(`   🗑️ Deleted local file`);

//     return result.secure_url;
//   } catch (error) {
//     console.error(`   ❌ Upload failed: ${error.message}`);
//     throw error;
//   }
// }

// async function migrateAllProducts() {
//   try {
//     console.log("\n🔗 Connecting to MongoDB...");
//     await mongoose.connect(MONGODB_URI);
//     console.log("✅ MongoDB connected");

//     // Get all products
//     const products = await Product.find({});
//     console.log(`📊 Found ${products.length} products in database\n`);

//     let migratedCount = 0;
//     let imagesUploaded = 0;
//     const failedProducts = [];

//     for (let i = 0; i < products.length; i++) {
//       const product = products[i];
//       console.log(
//         `🔄 [${i + 1}/${products.length}] Processing: ${product.name}`
//       );

//       // Get all image paths from this product
//       const allImagePaths = [product.image, ...(product.images || [])].filter(
//         (img) => img && typeof img === "string" && img.startsWith("/uploads/")
//       );

//       console.log(`   Found ${allImagePaths.length} local image(s)`);

//       let productUpdated = false;
//       const newImageUrls = [];

//       for (const imgPath of allImagePaths) {
//         try {
//           // Convert database path to actual file path
//           // imgPath looks like: "/uploads/products/1765989732139-haircare_1.png"
//           // We need: "uploads/products/1765989732139-haircare_1.png"
//           const relativePath = imgPath.startsWith("/")
//             ? imgPath.slice(1)
//             : imgPath;
//           const absolutePath = path.join(process.cwd(), relativePath);

//           console.log(`   Looking for: ${absolutePath}`);

//           if (fs.existsSync(absolutePath)) {
//             console.log(`   ✅ File exists`);

//             // Upload to Cloudinary
//             const cloudinaryUrl = await uploadImage(absolutePath);
//             newImageUrls.push(cloudinaryUrl);
//             imagesUploaded++;

//             // Update product in memory
//             if (product.image === imgPath) {
//               product.image = cloudinaryUrl;
//             }

//             if (product.images && Array.isArray(product.images)) {
//               product.images = product.images.map((img) =>
//                 img === imgPath ? cloudinaryUrl : img
//               );
//             }

//             productUpdated = true;
//           } else {
//             console.log(`   ❌ File not found at: ${absolutePath}`);

//             // Try alternative: just filename
//             const filename = path.basename(imgPath);
//             const altPath = path.join(
//               process.cwd(),
//               "uploads",
//               "products",
//               filename
//             );
//             console.log(`   Trying alternative: ${altPath}`);

//             if (fs.existsSync(altPath)) {
//               console.log(`   ✅ Found at alternative location`);
//               const cloudinaryUrl = await uploadImage(altPath);
//               newImageUrls.push(cloudinaryUrl);
//               imagesUploaded++;

//               // Update product
//               if (product.image === imgPath) {
//                 product.image = cloudinaryUrl;
//               }

//               if (product.images) {
//                 product.images = product.images.map((img) =>
//                   img === imgPath ? cloudinaryUrl : img
//                 );
//               }

//               productUpdated = true;
//             } else {
//               console.log(
//                 `   ❌ File not found anywhere, keeping original path`
//               );
//               newImageUrls.push(imgPath); // Keep original
//             }
//           }
//         } catch (error) {
//           console.log(`   ❌ Error processing image: ${error.message}`);
//           newImageUrls.push(imgPath); // Keep original on error
//         }
//       }

//       // Save updated product
//       if (productUpdated) {
//         try {
//           await product.save();
//           migratedCount++;
//           console.log(`   💾 Saved to database`);
//         } catch (saveError) {
//           console.log(`   ❌ Failed to save: ${saveError.message}`);
//           failedProducts.push(product.name);
//         }
//       } else {
//         console.log(`   ⏩ No changes needed`);
//       }

//       console.log(""); // Empty line for readability
//     }

//     // Results
//     console.log("=".repeat(60));
//     console.log("🎉 MIGRATION COMPLETE");
//     console.log("=".repeat(60));
//     console.log(`📦 Total Products: ${products.length}`);
//     console.log(`✅ Successfully Migrated: ${migratedCount}`);
//     console.log(`🖼️ Images Uploaded to Cloudinary: ${imagesUploaded}`);

//     if (failedProducts.length > 0) {
//       console.log(`❌ Failed Products: ${failedProducts.length}`);
//       console.log("   " + failedProducts.join(", "));
//     }

//     console.log("=".repeat(60));

//     // Show some updated products as proof
//     if (migratedCount > 0) {
//       console.log("\n📋 Sample of Updated Products:");
//       const updatedProducts = await Product.find({
//         image: { $regex: "cloudinary.com", $options: "i" },
//       }).limit(3);

//       updatedProducts.forEach((p, idx) => {
//         console.log(`\n${idx + 1}. ${p.name}`);
//         console.log(`   Image: ${p.image.substring(0, 80)}...`);
//         if (p.images && p.images.length > 0) {
//           console.log(`   All Images: ${p.images.length} total`);
//         }
//       });
//     }
//   } catch (error) {
//     console.error("❌ Migration failed:", error);
//   } finally {
//     await mongoose.disconnect();
//     console.log("\n🔌 Disconnected from MongoDB");
//   }
// }

// // Run the migration
// migrateAllProducts();

import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import ReturnRequest from "./models/ReturnRequest.js";
import fs from "fs";
import path from "path";

// Load environment variables
dotenv.config();

console.log("🔧 Cloudinary Configuration Check:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ Missing");
console.log(
  "API Secret:",
  process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ Missing"
);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const MONGODB_URI =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/ecommerce";

async function uploadImage(filePath, folder = "products") {
  try {
    console.log(`   Uploading to ${folder}: ${path.basename(filePath)}`);

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
    });

    console.log(`   ✅ Uploaded to Cloudinary`);
    console.log(`   🔗 URL: ${result.secure_url.substring(0, 80)}...`);

    // Delete local file
    fs.unlinkSync(filePath);
    console.log(`   🗑️ Deleted local file`);

    return result.secure_url;
  } catch (error) {
    console.error(`   ❌ Upload failed: ${error.message}`);
    throw error;
  }
}

async function migrateReturnImages() {
  try {
    console.log("\n🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Find all return requests with local image paths
    const returnRequests = await ReturnRequest.find({
      $or: [
        { transactionProof: { $regex: "^/uploads/" } },
        { "additionalImages.0": { $regex: "^/uploads/" } },
      ],
    });

    console.log(
      `📊 Found ${returnRequests.length} return requests to migrate\n`
    );

    let migratedCount = 0;
    let imagesUploaded = 0;
    const failedRequests = [];

    for (let i = 0; i < returnRequests.length; i++) {
      const request = returnRequests[i];
      console.log(
        `🔄 [${i + 1}/${returnRequests.length}] Processing: ${request._id}`
      );

      let requestUpdated = false;

      // Process transaction proof
      if (
        request.transactionProof &&
        request.transactionProof.startsWith("/uploads/")
      ) {
        const filePath = path.join(
          process.cwd(),
          request.transactionProof.slice(1)
        );

        if (fs.existsSync(filePath)) {
          console.log(`   Uploading transaction proof`);
          try {
            const cloudinaryUrl = await uploadImage(filePath, "returns/proofs");
            request.transactionProof = cloudinaryUrl;
            imagesUploaded++;
            requestUpdated = true;
          } catch (error) {
            console.log(`   ❌ Failed: ${error.message}`);
          }
        }
      }

      // Process additional images
      if (request.additionalImages && request.additionalImages.length > 0) {
        const newAdditionalImages = [];

        for (let j = 0; j < request.additionalImages.length; j++) {
          const imgPath = request.additionalImages[j];

          if (imgPath && imgPath.startsWith("/uploads/")) {
            const filePath = path.join(process.cwd(), imgPath.slice(1));

            if (fs.existsSync(filePath)) {
              console.log(`   Uploading additional image ${j + 1}`);
              try {
                const cloudinaryUrl = await uploadImage(
                  filePath,
                  "returns/images"
                );
                newAdditionalImages.push(cloudinaryUrl);
                imagesUploaded++;
                requestUpdated = true;
              } catch (error) {
                console.log(`   ❌ Failed: ${error.message}`);
                newAdditionalImages.push(imgPath);
              }
            } else {
              newAdditionalImages.push(imgPath);
            }
          } else {
            newAdditionalImages.push(imgPath);
          }
        }

        request.additionalImages = newAdditionalImages;
      }

      // Save if updated
      if (requestUpdated) {
        try {
          await request.save();
          migratedCount++;
          console.log(`   💾 Saved to database`);
        } catch (saveError) {
          console.log(`   ❌ Save failed: ${saveError.message}`);
          failedRequests.push(request._id);
        }
      } else {
        console.log(`   ⏩ No changes needed`);
      }

      console.log("");
    }

    // Results
    console.log("=".repeat(60));
    console.log("🎉 RETURN IMAGES MIGRATION COMPLETE");
    console.log("=".repeat(60));
    console.log(`📦 Total Requests Processed: ${returnRequests.length}`);
    console.log(`✅ Successfully Migrated: ${migratedCount}`);
    console.log(`🖼️ Images Uploaded to Cloudinary: ${imagesUploaded}`);

    if (failedRequests.length > 0) {
      console.log(`❌ Failed Requests: ${failedRequests.length}`);
    }

    console.log("=".repeat(60));

    // Show sample after migration
    if (migratedCount > 0) {
      console.log("\n📋 Sample of Updated Requests:");
      const sample = await ReturnRequest.find({
        transactionProof: { $regex: "cloudinary.com", $options: "i" },
      }).limit(2);

      sample.forEach((req, idx) => {
        console.log(`\n${idx + 1}. Request ID: ${req._id}`);
        console.log(
          `   Transaction Proof: ${req.transactionProof?.substring(0, 60) || "None"}...`
        );
        if (req.additionalImages?.length > 0) {
          console.log(`   Additional Images: ${req.additionalImages.length}`);
        }
      });
    }
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run the migration
migrateReturnImages();
