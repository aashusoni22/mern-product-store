import { Link, useLocation, useParams } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useCartStore } from "../store/cart";
import { Bounce, toast } from "react-toastify";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsTruck, BsShieldCheck, BsArrowReturnLeft } from "react-icons/bs";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProduct, selectedProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const fromCart = location.state?.from === "cart";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleToCart = async () => {
    const { success, message } = await addToCart(selectedProduct);
    if (success) {
      setAdded(true);
      toast.success("Product added to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        setAdded(false);
      }, 3000);
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  if (!selectedProduct)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8 mt-12">
        {/* Back Button */}
        <Link
          to={fromCart ? "/cart" : "/"}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <IoArrowBackCircleOutline className="text-2xl" />
          <span>{fromCart ? "Back to Cart" : "Back to Products"}</span>
        </Link>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative group">
            <div className="aspect-square overflow-hidden rounded-2xl bg-slate-800">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" /> */}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-white mb-4">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-cyan-500">
                ${selectedProduct.price}
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium">
                In Stock
              </span>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Description
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-white font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleToCart}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  added
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-cyan-500 hover:bg-cyan-600"
                } text-white transform active:scale-95`}
              >
                {added ? (
                  <>
                    <FaCheck className="text-xl" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <MdOutlineShoppingCartCheckout className="text-xl" />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 transform active:scale-95">
                <HiOutlineShoppingBag className="text-xl" />
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <BsTruck className="text-2xl text-cyan-500" />
                <div>
                  <h3 className="text-white font-medium">Free Shipping</h3>
                  <p className="text-sm text-slate-400">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BsShieldCheck className="text-2xl text-cyan-500" />
                <div>
                  <h3 className="text-white font-medium">Secure Payment</h3>
                  <p className="text-sm text-slate-400">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BsArrowReturnLeft className="text-2xl text-cyan-500" />
                <div>
                  <h3 className="text-white font-medium">Easy Returns</h3>
                  <p className="text-sm text-slate-400">
                    30 days return policy
                  </p>
                </div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div>
                  <span className="font-medium text-slate-300">
                    Product ID:
                  </span>
                  <p className="mt-1 break-words">{selectedProduct._id}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-300">Added on:</span>
                  <p className="mt-1">
                    {selectedProduct.createdAt
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
