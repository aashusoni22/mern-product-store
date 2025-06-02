import mongoose from "mongoose";
import CartItem from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;

  if (!productId || !name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Incomplete product data" });
  }

  try {
    const existingItem = await CartItem.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({ success: true, data: existingItem });
    }

    const newItem = new CartItem({
      productId,
      name,
      price,
      image,
      quantity,
    });

    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  try {
    const deletedCartItem = await CartItem.findByIdAndDelete(id);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const result = await CartItem.deleteMany({});
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found in cart" });
    }
    res
      .status(200)
      .json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Cart item not found" });
  }

  if (!quantity || quantity < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid quantity" });
  }

  try {
    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
