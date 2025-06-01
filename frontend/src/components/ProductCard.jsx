import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";
import Modal from "./Modal";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (productId) => {
    const { success, message } = await deleteProduct(productId);

    if (success) {
      toast.success("Product deleted successfully", {
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
  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        key={product._id}
        className="bg-slate-800 p-4 rounded shadow-md md:hover:scale-105 transition duration-300 ease-in-out"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="text-lg font-semibold mt-2 text-white">
          {product.name}
        </h2>
        <p className="text-slate-400">${product.price}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600 transition duration-200 ease-in-out cursor-pointer"
            onClick={handleEdit}
          >
            <BiEdit className="text-xl" />
          </button>
          <button
            className="bg-rose-500 text-white p-2 rounded hover:bg-rose-600 transition duration-200 ease-in-out cursor-pointer"
            onClick={() => handleDelete(product._id)}
          >
            <MdOutlineDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>
      {showModal && (
        <Modal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ProductCard;
