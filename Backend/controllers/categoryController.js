import Category from "../models/Category.model.js";
import Product from "../models/Products.model.js";
// Add new category
export const addCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category exists" });

    const category = await Category.create({ name, description });
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Update category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category updated", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete category
// Delete category + delete related products
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // DELETE products related to the category
    await Product.deleteMany({ category: id });

    res.json({ message: "Category and related products deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
