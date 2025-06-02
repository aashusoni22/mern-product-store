import { useState } from "react";
import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";

const UpdateModal = ({ onClose, product }) => {
  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleUpdate = async (e) => {
    e.preventDefault();
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
    <div className="fixed inset-0 backdrop-blur bg-black/10 flex items-center justify-center p-4 md:p-0">
      <div className="bg-slate-800 w-96 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl text-center font-bold text-white mb-4">
          Update Product
        </h1>
        <form
          className="flex flex-col gap-4 text-white"
          onSubmit={handleUpdate}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="productName" className="text-white font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. T-Shirt"
              id="productName"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              className="bg-slate-700 p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="productPrice" className="text-white font-semibold">
              Price
            </label>
            <input
              type="text"
              placeholder="e.g. 1000"
              id="productPrice"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value,
                })
              }
              className="bg-slate-700 p-2 w-full rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="productImg" className="text-white font-semibold">
              Image
            </label>
            <input
              type="text"
              placeholder="e.g. https://example.com/image.jpg"
              id="productImg"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  image: e.target.value,
                })
              }
              className="bg-slate-700 p-2 w-full rounded"
            />
          </div>
          <div className="flex items-center gap-2 mt-2 mb-2">
            <button
              type="submit"
              className="bg-blue-500 p-2 w-full rounded text-white hover:bg-blue-600 cursor-pointer duration-200 transition ease-in-out"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="bg-slate-600 p-2 w-full rounded text-white hover:bg-slate-700 cursor-pointer duration-200 transition ease-in-out"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
