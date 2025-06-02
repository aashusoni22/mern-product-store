import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [],
  setCart: (cartItems) => set({ cartItems }),

  addToCart: async (product) => {
    if (!product) return { success: false, message: "No product provided" };

    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.productId === product._id
        );

        if (existingItemIndex !== -1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex].quantity += 1;
          return { cartItems: updatedCartItems };
        } else {
          return { cartItems: [...state.cartItems, data.data] };
        }
      });

      return { success: true, message: "Product added to cart" };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, message: "Failed to add product to cart" };
    }
  },

  removeFromCart: async (cartItemId) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        cartItems: state.cartItems.filter((item) => item._id !== cartItemId),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error removing from cart:", error);
      return { success: false, message: "Failed to remove item from cart" };
    }
  },

  fetchCartItems: async () => {
    try {
      const res = await fetch("/api/cart");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) return;

      set({ cartItems: data.data });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },

  clearCartItems: async () => {
    try {
      const res = await fetch("/api/cart/clear", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set({ cartItems: [] });
      return { success: true, message: "Cart cleared successfully" };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, message: "Failed to clear cart" };
    }
  },

  updateCartItemQuantity: async (cartItemId, quantity) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item._id === cartItemId ? data.data : item
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      return { success: false, message: "Failed to update cart item quantity" };
    }
  },
}));
