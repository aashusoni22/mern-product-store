import { useEffect, useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useCartStore } from "../store/cart";

const CartPage = () => {
  const { fetchCartItems, cartItems, removeFromCart, clearCartItems } =
    useCartStore();

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
    await clearCartItems();
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
          <Link to="/" className="text-blue-500">
            Go shop!
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between bg-slate-800 text-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-white bg-rose-500 px-3 py-2 rounded hover:bg-rose-600"
                >
                  <MdOutlineDeleteOutline className="text-2xl" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <button
              onClick={handleClearCart}
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
