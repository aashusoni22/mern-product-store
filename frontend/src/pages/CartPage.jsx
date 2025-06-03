import { useEffect, useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  MdOutlineDeleteOutline,
  MdOutlineShoppingCartCheckout,
  MdOutlineClose,
} from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { useCartStore } from "../store/cart";
import { useProductStore } from "../store/product";

const CartPage = () => {
  const {
    fetchCartItems,
    cartItems,
    removeFromCart,
    clearCartItems,
    updateCartItemQuantity,
  } = useCartStore();
  const { products } = useProductStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      await fetchCartItems();
      setLoading(false);
    };

    loadCart();
  }, []);

  const handleRemoveItem = async (id) => {
    await removeFromCart(id);
  };

  const handleClearCart = async () => {
    const result = await clearCartItems();
    if (!result.success) {
      console.error(result.message);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="flex flex-col max-w-7xl mx-auto px-6 py-6 sm:px-6 mt-12">
        {/* Header Section */}
        <div className="flex gap-2 items-center mb-8">
          <RiShoppingCartFill className="text-2xl md:text-2xl text-cyan-500" />
          <h1 className="text-2xl md:text-2xl font-semibold text-white">
            Your Shopping Cart
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 bg-slate-800/50 rounded-lg p-8">
            <HiShoppingBag className="text-6xl text-slate-400 mb-4" />
            <p className="text-slate-400 text-lg font-semibold text-center">
              Your cart is empty.{" "}
              <Link
                to="/"
                className="text-cyan-500 hover:text-cyan-400 underline"
              >
                Start shopping
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-800 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/products/${item.productId}`}
                      state={{ from: "cart" }}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link
                        to={`/products/${item.productId}`}
                        state={{ from: "cart" }}
                        className="block"
                      >
                        <h3 className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors duration-200">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-cyan-500 font-semibold mt-1">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <label className="text-slate-400">Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (newQuantity > 0) {
                                updateCartItemQuantity(item._id, newQuantity);
                              }
                            }}
                            className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-slate-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <MdOutlineClose className="text-xl" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="hidden md:block text-lg font-semibold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-white">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <Link
                    to="/checkout"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <MdOutlineShoppingCartCheckout className="text-xl" />
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={handleClearCart}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <MdOutlineDeleteOutline className="text-xl" />
                    Clear Cart
                  </button>
                  <Link
                    to="/"
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
