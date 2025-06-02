import { useEffect, useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  MdOutlineDeleteOutline,
  MdOutlineShoppingCartCheckout,
  MdOutlineClose,
} from "react-icons/md";
import { useCartStore } from "../store/cart";

const CartPage = () => {
  const {
    fetchCartItems,
    cartItems,
    removeFromCart,
    clearCartItems,
    updateCartItemQuantity,
  } = useCartStore();

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

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-6 py-4 sm:px-6 mt-12">
      <div className="flex gap-2 items-center mb-5">
        <RiShoppingCartFill className="text-2xl md:text-3xl text-white" />
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Your Cart
        </h1>
      </div>

      {loading ? (
        <p className="text-white">Loading cart items...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-white">
          Your cart is empty.{" "}
          <Link to="/" className="text-cyan-500">
            Go shop!
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between bg-slate-800 text-white p-4 rounded shadow border border-slate-800 hover:border-cyan-500 transition duration-200 ease-in-out"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    className="text-white px-2 py-2 w-14 rounded bg-slate-700 border border-slate-600 hover:border-cyan-500 transition duration-200 ease-in-out"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (newQuantity > 0) {
                        updateCartItemQuantity(item._id, newQuantity);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-white bg-rose-500 px-3 py-2 rounded hover:bg-rose-600"
                  >
                    <MdOutlineClose className="text-2xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <p className="text-white text-lg font-semibold">
              Total: $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleClearCart}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded flex items-center gap-1"
            >
              <MdOutlineDeleteOutline className="text-xl text-rose-500" />
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded ml-4 flex items-center gap-1"
            >
              <MdOutlineShoppingCartCheckout className="text-2xl" />
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
