import { useState } from "react";
import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const UpdateModal = ({ onClose, product }) => {
  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [error, setError] = useState({});

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      updatedProduct.name === "" ||
      updatedProduct.price === "" ||
      updatedProduct.description === "" ||
      updatedProduct.image === ""
    ) {
      setError({
        name: updatedProduct.name === "" ? "Name is required" : "",
        price: updatedProduct.price === "" ? "Price is required" : "",
        description:
          updatedProduct.description === "" ? "Description is required" : "",
        image: updatedProduct.image === "" ? "Image is required" : "",
      });
      return;
    }

    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );

    if (success) {
      toast.success("Product updated successfully", {
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
      setError({});
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
      <div className="bg-slate-800 w-full max-w-2xl rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-2xl font-semibold text-white">Update Product</h1>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. Premium T-Shirt"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              />
              {error.name && (
                <p className="mt-1 text-sm text-red-500">{error.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full pl-8 pr-3 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                />
              </div>
              {error.price && (
                <p className="mt-1 text-sm text-red-500">{error.price}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your product..."
              value={updatedProduct.description}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  description: e.target.value,
                })
              }
              rows="4"
              className="w-full px-3 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white resize-none"
            />
            {error.description && (
              <p className="mt-1 text-sm text-red-500">{error.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Image URL
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              />
              <MdOutlineAddPhotoAlternate className="absolute left-3 top-2.5 text-xl text-slate-400" />
            </div>
            {error.image && (
              <p className="mt-1 text-sm text-red-500">{error.image}</p>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
            <button
              type="submit"
              className="hidden md:block flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Update Product
            </button>
            <button
              type="submit"
              className="md:hidden flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
