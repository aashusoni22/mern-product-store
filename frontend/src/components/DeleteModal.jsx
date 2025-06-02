import { useState } from "react";
import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";

const DeleteModal = ({ onClose, product }) => {
  const { deleteProduct } = useProductStore();

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

  return (
    <div className="fixed inset-0 z-50 backdrop-blur bg-black/10 flex items-center justify-center">
      <div className="bg-slate-800 w-96 p-4 rounded-lg shadow-md">
        <p className="text-xl text-center font-bold text-white mb-4">
          Are you sure you want to delete{" "}
          <span className="text-cyan-400">{product.name}</span> Product?
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
