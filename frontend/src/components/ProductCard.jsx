import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { Bounce, toast } from "react-toastify";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddToCart = async () => {
    const { success, message } = await addToCart(product);

    if (success) {
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

  return (
    <>
      <div className="group bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Product Image */}
        <Link to={`/products/${product._id}`} className="block relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <Link to={`/products/${product._id}`}>
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
          <p className="text-slate-400 text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-cyan-500">
              ${product.price}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="md:hidden bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <HiOutlinePencilAlt className="text-xl" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="md:hidden bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <MdOutlineDelete className="text-xl" />
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <MdOutlineAddShoppingCart className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="hidden md:flex absolute top-2 right-2 gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setShowUpdateModal(true)}
            className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <HiOutlinePencilAlt className="text-xl" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <MdOutlineDelete className="text-xl" />
          </button>
        </div>
      </div>

      {showUpdateModal && (
        <UpdateModal
          onClose={() => setShowUpdateModal(false)}
          product={product}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          product={product}
        />
      )}
    </>
  );
};

export default ProductCard;
