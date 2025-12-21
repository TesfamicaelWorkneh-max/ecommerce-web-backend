import Cart from "../models/Cart.model.js";
import Product from "../models/Products.model.js";
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.isSold)
      return res.status(400).json({ message: "This product is already sold" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available in stock`,
        });
      }

      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });

      return res.json(cart);
    }

    const item = cart.items.find((i) => i.product.toString() === productId);

    if (item) {
      const newQty = item.quantity + quantity;

      if (newQty > product.stock) {
        return res.status(400).json({
          message: `You already have ${item.quantity} in cart, only ${product.stock - item.quantity} more available in stock`,
        });
      }

      item.quantity = newQty;
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available in stock`,
        });
      }
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET USER CART
// GET USER CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.json({ items: [] }); // no items yet
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error loading cart" });
  }
};
// UPDATE QUANTITY
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available in stock`,
      });
    }

    const cart = await Cart.findOne({ user: userId });
    const item = cart.items.find((i) => i.product.toString() === productId);

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // FIXED
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== productId
    );

    await cart.save();
    return res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
