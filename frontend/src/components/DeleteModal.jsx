import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const DeleteModal = ({ onClose, product }) => {
  const { deleteProduct } = useProductStore();

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);

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
      onClose();
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
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 md:p-0 z-50">
      <div className="bg-slate-800 w-full max-w-md rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-2xl font-semibold text-white">Delete Product</h1>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center">
            <div className="bg-red-500/10 p-4 rounded-full">
              <MdOutlineDelete className="text-4xl text-red-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-medium text-white">
              Are you sure you want to delete this product?
            </h2>
            <p className="text-slate-400">
              This action cannot be undone. This will permanently delete the
              product "{product.name}".
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
            <button
              onClick={handleDelete}
              className="hidden md:block flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Delete Product
            </button>
            <button
              onClick={handleDelete}
              className="md:hidden flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
