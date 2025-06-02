import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateModal from "./UpdateModal";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import DeleteModal from "./DeleteModal";
import { useCartStore } from "../store/cart";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCartStore();

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleAddToCart = async () => {
    const { success, message } = await addToCart(product);

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

  return (
    <>
      <div
        key={product._id}
        className="bg-slate-800 p-4 rounded shadow-md hover:scale-[1.02] transition duration-300 ease-in-out"
      >
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-50 object-cover rounded"
          />
        </Link>
        <h2 className="text-lg font-semibold mt-2 text-white">
          {product.name}
        </h2>
        <p className="text-slate-400">${product.price}</p>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className={`${
              added ? "bg-emerald-500" : "bg-cyan-500"
            } text-white p-2 w-full hover:w-[48rem] flex justify-center rounded hover:${
              added ? "bg-emerald-600" : "bg-cyan-600"
            } transition-all duration-200 ease-in-out cursor-pointer`}
          >
            {added ? (
              <FaCheck className="text-xl" />
            ) : (
              <RiShoppingCartLine className="text-xl" />
            )}
          </button>
          <button
            className="bg-slate-600 text-white p-2 w-full flex justify-center rounded hover:bg-slate-700 transition duration-200 ease-in-out cursor-pointer"
            onClick={handleEdit}
          >
            <BiEdit className="text-xl" />
          </button>
          <button
            className="bg-slate-600 text-white p-2 w-24 flex justify-center rounded hover:bg-slate-700 transition duration-200 ease-in-out cursor-pointer"
            onClick={() => setShowDeleteModal(true)}
          >
            <MdOutlineDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>

      {showModal && (
        <UpdateModal product={product} onClose={() => setShowModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteModal
          product={product}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
