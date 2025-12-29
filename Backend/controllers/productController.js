import Product from "../models/Products.model.js";
import Category from "../models/Category.model.js";
import fs from "fs";
import path from "path";
// import { io } from "../Server.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { getIO } from "../socket.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// const normalizeImage = (img) => {
//   if (!img)
//     return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";

//   let fixed = img.toString().replace(/\\/g, "/");
//   if (fixed.startsWith("http")) return fixed;
//   if (!fixed.startsWith("/")) fixed = "/" + fixed;
//   return `http://localhost:3000${fixed}`;
// };
const SERVER_URL =
  process.env.SERVER_URL ||
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:3000");

const normalizeImage = (img) => {
  if (!img)
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";

  let fixed = img.toString().replace(/\\/g, "/");

  if (fixed.startsWith("http")) return fixed;

  if (!fixed.startsWith("/")) fixed = "/" + fixed;

  return `${SERVER_URL}${fixed}`;
};

// controllers/productController.js
export const getProductsByCategoryPaginated = async (req, res) => {
  try {
    const name = req.params.name;
    let { page = 1, limit = 8, sortBy } = req.query;
    page = Number(page);
    limit = Number(limit);

    const category = await Category.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });
    if (!category)
      return res.status(404).json({ products: [], page: 1, pages: 1 });

    // Sorting logic
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sortBy === "priceAsc") sortOption = { price: 1 };
    else if (sortBy === "priceDesc") sortOption = { price: -1 };
    else if (sortBy === "newArrival") sortOption = { createdAt: -1 };
    else if (sortBy === "bestSeller") sortOption = { soldCount: -1 };
    else if (sortBy === "popularity") sortOption = { likes: -1 }; // most liked first

    // Fetch total count
    const total = await Product.countDocuments({ category: category._id });

    const products = await Product.find({ category: category._id })
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortOption);

    const formatted = products.map((p) => ({
      ...p.toObject(),
      likesCount: p.likes.length || 0, // include likes count for frontend
      image: normalizeImage(p.image || p.images?.[0]),
    }));

    res.status(200).json({
      products: formatted,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE product
export const createProduct = async (req, res) => {
  try {
    let { name, price, stock, category, isSold, description, relatedProducts } =
      req.body;

    if (description) description = JSON.parse(description);
    if (relatedProducts) {
      try {
        relatedProducts = JSON.parse(relatedProducts);
      } catch {
        relatedProducts = [];
      }
    }

    // ✅ Use Cloudinary URL if uploaded
    let mainImage = "";
    const images = [];

    if (req.cloudinaryResult) {
      mainImage = req.cloudinaryResult.url;
      images.push(mainImage);
    } else if (req.file) {
      // Legacy local file (if Cloudinary fails)
      mainImage = `/uploads/products/${req.file.filename}`;
      images.push(mainImage);
    }

    const product = new Product({
      name,
      price,
      stock,
      category,
      isSold,
      description,
      relatedProducts,
      image: mainImage,
      images,
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRelatedProductsGrouped = async (req, res) => {
  try {
    const { id } = req.params;

    // load main product (populate category name)
    const main = await Product.findById(id).populate("category", "name").lean();
    if (!main) return res.status(404).json({ message: "Product not found" });

    // fetch all products and populate category name for each
    const all = await Product.find({}).populate("category", "name").lean();

    // utility: safe parse number
    const toNumber = (v) => {
      const n = parseFloat(v);
      return Number.isFinite(n) ? n : null;
    };

    // Build list excluding main product
    const others = all.filter((p) => p._id.toString() !== id);

    // Keep used ids to avoid duplicates across groups
    const used = new Set();

    // 0) Manual relatedProducts (if admin set them)
    let manual = [];
    if (Array.isArray(main.relatedProducts) && main.relatedProducts.length) {
      const rpIds = main.relatedProducts.map((r) => r.toString());
      manual = others.filter((p) => rpIds.includes(p._id.toString()));
      manual.forEach((p) => used.add(p._id.toString()));
    }

    // 1) Same category (exact match of ObjectId string)
    const sameCategory = others
      .filter(
        (p) =>
          !used.has(p._id.toString()) &&
          p.category &&
          main.category &&
          p.category._id.toString() === main.category._id.toString()
      )
      .slice(0, 12);
    sameCategory.forEach((p) => used.add(p._id.toString()));

    // 2) Same price (exact numeric equality)
    const mainPrice = toNumber(main.price);
    const samePrice =
      mainPrice !== null
        ? others
            .filter(
              (p) =>
                !used.has(p._id.toString()) &&
                toNumber(p.price) !== null &&
                toNumber(p.price) === mainPrice
            )
            .slice(0, 12)
        : [];
    samePrice.forEach((p) => used.add(p._id.toString()));

    // 3) Same name (exact, case-insensitive, trimmed)
    const mainName = (main.name || "").trim().toLowerCase();
    const sameName = mainName
      ? others
          .filter(
            (p) =>
              !used.has(p._id.toString()) &&
              (p.name || "").trim().toLowerCase() === mainName
          )
          .slice(0, 12)
      : [];
    sameName.forEach((p) => used.add(p._id.toString()));

    // 4) Same features — any overlapping keyFeatures (case-insensitive)
    const mainFeatures = (main.description?.keyFeatures || [])
      .map((f) =>
        String(f || "")
          .trim()
          .toLowerCase()
      )
      .filter(Boolean);

    const sameFeatures = mainFeatures.length
      ? others
          .filter((p) => {
            if (used.has(p._id.toString())) return false;
            const pFeatures = (p.description?.keyFeatures || []).map((f) =>
              String(f || "")
                .trim()
                .toLowerCase()
            );
            return mainFeatures.some((mf) => pFeatures.includes(mf));
          })
          .slice(0, 12)
      : [];
    sameFeatures.forEach((p) => used.add(p._id.toString()));

    // Normalize image & ensure category shape
    const normalizeGroup = (arr) =>
      arr.map((p) => ({
        ...p,
        image: normalizeImage(p.images?.[0] || p.image || "/fallback.png"),
        // ensure category object has name if populated, otherwise keep as-is
        category:
          p.category && typeof p.category === "object"
            ? { _id: p.category._id, name: p.category.name || "" }
            : { _id: p.category, name: "" },
      }));

    res.json({
      manual: normalizeGroup(manual),
      sameCategory: normalizeGroup(sameCategory),
      samePrice: normalizeGroup(samePrice),
      sameName: normalizeGroup(sameName),
      sameFeatures: normalizeGroup(sameFeatures),
    });
  } catch (error) {
    console.error("getRelatedProductsGrouped error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let { name, price, stock, category, isSold, description, relatedProducts } =
      req.body;

    if (description) description = JSON.parse(description);
    if (relatedProducts) {
      try {
        relatedProducts = JSON.parse(relatedProducts);
      } catch {
        relatedProducts = [];
      }
    }

    const updates = {
      name,
      price,
      stock,
      category,
      isSold,
      description,
      relatedProducts,
    };

    // ✅ Handle Cloudinary upload
    if (req.cloudinaryResult) {
      const mainImage = req.cloudinaryResult.url;
      updates.image = mainImage;
      updates.images = [mainImage];

      // Delete old image from Cloudinary if it exists
      const existingProduct = await Product.findById(req.params.id);
      if (existingProduct && existingProduct.image) {
        await deleteFromCloudinary(existingProduct.image);
      }
    } else if (req.file) {
      // Legacy local file
      const mainImage = `/uploads/products/${req.file.filename}`;
      updates.image = mainImage;
      updates.images = [mainImage];
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ✅ Delete from Cloudinary
    const allImages = [product.image, ...(product.images || [])];
    for (const img of allImages) {
      if (img) {
        await deleteFromCloudinary(img);
      }
    }

    // Legacy: Delete local files
    allImages.forEach((img) => {
      if (img && img.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), img.replace(/^\//, ""));
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, () => {});
        }
      }
    });

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminProducts = async (req, res) => {
  try {
    let { isSold, page = 1, limit = 8, category, sort } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {};
    if (isSold === "true") query.isSold = true;
    if (isSold === "false") query.isSold = false;
    if (category) query.category = category;

    // sorting
    let sortOption = { createdAt: -1 }; // default latest
    if (sort === "likes") sortOption = { likesCount: -1 };
    if (sort === "stock") sortOption = { stock: -1 };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    const formatted = products.map((p) => ({
      ...p.toObject(),
      image: normalizeImage(p.image || p.images?.[0]),
      likesCount: Array.isArray(p.likes) ? p.likes.length : 0,
    }));

    res.json({
      products: formatted,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load products" });
  }
};

// Helper: get user id from Authorization header if present (optional)
const getUserIdFromReq = (req) => {
  try {
    const auth = req.headers?.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return null;
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.id || null;
  } catch (err) {
    return null;
  }
};

// GET all products grouped by category (returns likesCount and isLiked if user present)
export const getAllProductsGrouped = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    const userId = getUserIdFromReq(req);

    const grouped = {};
    products.forEach((p) => {
      // ensure likesCount is correct
      const likesCount = Array.isArray(p.likes) ? p.likes.length : 0;
      // determine isLiked for requesting user
      const isLiked =
        !!userId && Array.isArray(p.likes)
          ? p.likes.some((id) => id.toString() === userId.toString())
          : false;

      const catName = p.category?.name || "Uncategorized";
      if (!grouped[catName]) grouped[catName] = [];
      grouped[catName].push({
        ...p.toObject(),
        image: normalizeImage(p.image || p.images?.[0]),
        likesCount,
        isLiked,
      });
    });

    res.status(200).json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET product by ID (includes likesCount and isLiked)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });

    const likesCount = Array.isArray(product.likes) ? product.likes.length : 0;
    const userId = getUserIdFromReq(req);
    const isLiked =
      !!userId && Array.isArray(product.likes)
        ? product.likes.some((id) => id.toString() === userId.toString())
        : false;

    res.json({
      ...product.toObject(),
      image: normalizeImage(product.image || product.images?.[0]),
      likesCount,
      isLiked,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleLike = async (req, res) => {
  const userId = req.user._id;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  const index = product.likes.findIndex(
    (id) => id.toString() === userId.toString()
  );

  let liked;
  if (index > -1) {
    product.likes.splice(index, 1);
    liked = false;
  } else {
    product.likes.push(userId);
    liked = true;
  }

  await product.save();

  const likesCount = product.likes.length;

  const io = getIO(); // ✅ SAFE HERE
  if (io) {
    io.to(product._id.toString()).emit("likeUpdated", {
      productId: product._id,
      likesCount,
      liked,
    });
  }

  res.json({ liked, likesCount });
};

export const getTopLikedProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ likesCount: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ MAIN SEARCH ENDPOINT - Works with your database
export const searchProducts = async (req, res) => {
  try {
    const {
      q: searchTerm,
      category,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
    } = req.query;
    console.log("Search request:", {
      searchTerm,
      category,
      minPrice,
      maxPrice,
      sortBy,
    });

    // Build search filter
    let filter = {};

    // 🔍 Text search across multiple fields
    if (searchTerm && searchTerm.trim() !== "") {
      filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { "description.intro": { $regex: searchTerm, $options: "i" } },
        { "description.keyFeatures": { $regex: searchTerm, $options: "i" } },
        { "description.howToUse": { $regex: searchTerm, $options: "i" } },
        { "description.ingredients": { $regex: searchTerm, $options: "i" } },
        { "description.benefits": { $regex: searchTerm, $options: "i" } },
        { "description.storage": { $regex: searchTerm, $options: "i" } },
      ];
    }

    // 🏷️ Category search (by name or ID)
    if (category && category.trim() !== "") {
      console.log("Searching category:", category);

      // Check if it's an ObjectId
      if (mongoose.Types.ObjectId.isValid(category)) {
        filter.category = new mongoose.Types.ObjectId(category);
      } else {
        // Search by category name (case-insensitive)
        const categoryDoc = await Category.findOne({
          name: { $regex: `^${category}$`, $options: "i" },
        });

        if (categoryDoc) {
          filter.category = categoryDoc._id;
          console.log(
            "Found category by name:",
            categoryDoc.name,
            "ID:",
            categoryDoc._id
          );
        } else {
          // Try partial match
          const partialCategory = await Category.findOne({
            name: { $regex: category, $options: "i" },
          });

          if (partialCategory) {
            filter.category = partialCategory._id;
            console.log(
              "Found category by partial match:",
              partialCategory.name
            );
          }
        }
      }
    }

    // 💰 Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 📊 Sort options
    let sortOptions = {};
    switch (sortBy) {
      case "price-asc":
        sortOptions.price = 1;
        break;
      case "price-desc":
        sortOptions.price = -1;
        break;
      case "popularity":
        sortOptions.popularity = -1;
        break;
      case "stock":
        sortOptions.stock = -1;
        break;
      case "createdAt":
      default:
        sortOptions.createdAt = -1;
    }

    console.log("Final filter:", JSON.stringify(filter));

    // 🔥 Execute search with proper population
    const products = await Product.find(filter)
      .populate({
        path: "category",
        select: "name description",
      })
      .sort(sortOptions)
      .limit(100)
      .lean();

    console.log(`Found ${products.length} products`);

    // Format response
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      isSold: product.isSold,
      images: product.images || (product.image ? [product.image] : []),
      image: normalizeImage(product.images?.[0] || product.image),
      description: product.description || {},
      category: product.category || { name: "Uncategorized" },
      createdAt: product.createdAt,
      popularity: product.popularity || 0,
      likesCount: product.likes ? product.likes.length : 0,
      commentsCount: product.comments ? product.comments.length : 0,
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// ✅ GET ALL CATEGORIES FOR SEARCH DROPDOWN
export const getCategoriesForSearch = async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort({ name: 1 })
      .select("name _id")
      .lean();

    console.log(`Found ${categories.length} categories for search dropdown`);

    res.json(categories);
  } catch (error) {
    console.error("Categories fetch error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// ✅ QUICK SEARCH FOR NAVIGATION (Auto-complete)
export const quickSearch = async (req, res) => {
  try {
    const { q: searchTerm } = req.query;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.json([]);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { "description.keyFeatures": { $regex: searchTerm, $options: "i" } },
      ],
    })
      .populate("category", "name")
      .select("name price images category isSold stock")
      .limit(10)
      .lean();

    const formatted = products.map((p) => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      image: normalizeImage(p.images?.[0] || p.image),
      category: p.category?.name || "Uncategorized",
      isSold: p.isSold,
      stock: p.stock,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Quick search error:", error);
    res.json([]); // Return empty array instead of error
  }
};

// ✅ GET POPULAR SEARCHES (Based on your actual categories)
export const getPopularSearches = async (req, res) => {
  try {
    // Get your actual category names
    const categories = await Category.find({})
      .select("name")
      .sort({ name: 1 })
      .limit(8)
      .lean();

    const categoryNames = categories.map((c) => c.name);

    // Add some popular product searches based on your data
    const popularSearches = [
      ...categoryNames,
      "Perfume 7",
      "Blue",
      "bodycare",
      "skincare",
      "Gradient",
      "Combo",
    ];

    // Remove duplicates
    const uniqueSearches = [...new Set(popularSearches)].slice(0, 10);

    res.json(uniqueSearches);
  } catch (error) {
    // Return safe defaults
    res.json(["Perfume", "Bodycare", "Skincare", "Haircare", "Accessories"]);
  }
};

// ✅ GET PRODUCTS BY CATEGORY NAME
export const getProductsByCategoryName = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const { sortBy = "createdAt", minPrice, maxPrice } = req.query;

    console.log("Category search:", categoryName);

    // Find category by name (case-insensitive)
    const category = await Category.findOne({
      name: { $regex: `^${categoryName}$`, $options: "i" },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        suggestions: [
          "Perfume",
          "Bodycare",
          "Skincare",
          "Haircare",
          "Accessories",
        ],
      });
    }

    let filter = { category: category._id };

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOptions = {};
    switch (sortBy) {
      case "price-asc":
        sortOptions.price = 1;
        break;
      case "price-desc":
        sortOptions.price = -1;
        break;
      case "popularity":
        sortOptions.popularity = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOptions)
      .lean();

    res.json({
      success: true,
      category: category.name,
      count: products.length,
      products: products.map((p) => ({
        _id: p._id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        isSold: p.isSold,
        image: normalizeImage(p.images?.[0] || p.image),
        images: p.images || (p.image ? [p.image] : []),
        category: p.category?.name || "Uncategorized",
        description: p.description || {},
      })),
    });
  } catch (error) {
    console.error("Category products error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
