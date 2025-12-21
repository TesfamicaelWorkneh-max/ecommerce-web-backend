// import mongoose from "mongoose";
// import fs from "fs";
// import path from "path";
// import Category from "./models/Category.model.js";
// import Product from "./models/Products.model.js";
// import User from "./models/User.model.js";

// const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce";

// // Categories list
// const categoriesList = [
//   { name: "perfume", folder: "perfumes" },
//   { name: "skincare", folder: "skincares" },
//   { name: "haircare", folder: "haircares" },
//   { name: "bodycare", folder: "bodycares" },
//   { name: "sweat", folder: "sweates" },
// ];

// const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
// const BASE_UPLOAD_PATH = "./uploads/products";

// const seedDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("MongoDB Connected ✔️");

//     // Clear old data
//     await Category.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();
//     console.log("Old data cleared.");

//     // Create categories
//     const createdCategories = await Category.insertMany(
//       categoriesList.map((c) => ({ name: c.name }))
//     );
//     console.log("Categories created ✔️");

//     const categoryMap = {};
//     createdCategories.forEach(
//       (cat, index) => (categoryMap[categoriesList[index].folder] = cat._id)
//     );

//     // Create products
//     let productArray = [];

//     for (let cat of categoriesList) {
//       const folderPath = path.join(BASE_UPLOAD_PATH, cat.folder);

//       if (!fs.existsSync(folderPath)) {
//         console.log(`❌ Folder missing: ${folderPath}`);
//         continue;
//       }

//       const files = fs
//         .readdirSync(folderPath)
//         .filter((file) =>
//           allowedExtensions.includes(path.extname(file).toLowerCase())
//         );

//       console.log(`📁 ${cat.folder}: ${files.length} products found`);

//       files.forEach((file) => {
//         const nameFromFile = path.parse(file).name;
//         const productName = nameFromFile
//           .replace(/[_-]/g, " ")
//           .replace(/\b\w/g, (c) => c.toUpperCase());

//         productArray.push({
//           name: productName,
//           price: Math.floor(Math.random() * 200) + 50,
//           stock: Math.floor(Math.random() * 50) + 10,
//           category: categoryMap[cat.folder],
//           images: [`/uploads/products/${cat.folder}/${file}`], // array of images
//           description: {
//             intro: "Short intro for " + productName,
//             keyFeatures: ["Feature 1", "Feature 2"],
//             howToUse: "Use as directed",
//             ingredients: "Ingredients list",
//             benefits: ["Benefit 1", "Benefit 2"],
//             storage: "Store in a cool dry place",
//           },
//         });
//       });
//     }

//     await Product.insertMany(productArray);
//     console.log(`✅ Inserted ${productArray.length} products successfully`);

//     // Create admin user if not exists
//     const adminExists = await User.findOne({
//       email: "worknehtesfamicael707@gmail.com",
//     });
//     if (!adminExists) {
//       await User.create({
//         name: "Tesfamicael",
//         email: "worknehtesfamicael707@gmail.com",
//         password: "mariam21@123", // will be hashed automatically
//         role: "admin",
//         isVerified: true,
//       });
//       console.log("✅ Admin user created");
//     }

//     console.log("🎉 Seeding completed!");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// seedDB();

// // seed.js - UPDATED FIXED VERSION
// //
// seed.js - UPDATED WITH BETTER DEBUGGING
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import Category from "./models/Category.model.js";
import Product from "./models/Products.model.js";
import User from "./models/User.model.js";
import dotenv from "dotenv";

dotenv.config();
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected ✔️");

    // Clear old data
    await User.deleteMany();
    console.log("Old users cleared.");

    // Create admin user with MANUAL password hashing
    const adminEmail = "worknehtesfamicael707@gmail.com";
    const adminPassword = "mariam21@123";

    console.log("\n🔧 Creating admin user...");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);

    // Hash password manually to ensure it works
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    console.log("Hashed password:", hashedPassword.substring(0, 30) + "...");

    // Create admin using new User() to ensure middleware runs
    const adminUser = new User({
      name: "Tesfamicael",
      email: adminEmail,
      password: adminPassword, // Let the middleware hash it
      role: "admin",
      isVerified: true,
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully");

    // Verify the user was created
    const savedUser = await User.findOne({ email: adminEmail });
    console.log("\n📋 Verification:");
    console.log("Found user:", savedUser ? "Yes" : "No");
    console.log("Email:", savedUser?.email);
    console.log("Role:", savedUser?.role);
    console.log("Verified:", savedUser?.isVerified);
    console.log("Has password:", savedUser?.password ? "Yes" : "No");

    // Test password match
    if (savedUser) {
      const testMatch = await savedUser.matchPassword(adminPassword);
      console.log("Password test match:", testMatch ? "✅" : "❌");
    }

    console.log("\n🎉 Seeding completed!");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
