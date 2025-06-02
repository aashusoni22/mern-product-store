import express from "express";
import {
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCartItems);
router.post("/", addToCart);
router.delete("/clear", clearCart);
router.put("/:id", updateCartItemQuantity);
router.delete("/:id", removeFromCart);

export default router;
