import { useState } from "react";
import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();

  const { createProduct } = useProductStore();

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast.success("Product created successfully", {
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
      navigate("/");
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

    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  };

  return (
    <div className="bg-slate-950 mt-24">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="bg-slate-800 p-4 mt-5 w-88 md:w-96 rounded">
          <h1 className="text-2xl text-center font-bold text-white mb-4">
            Create New Product
          </h1>
          <form
            className="flex flex-col gap-4 text-white"
            onSubmit={handleProductSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="productName" className="text-white font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="e.g. T-Shirt"
                id="productName"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="bg-slate-700 p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="productPrice"
                className="text-white font-semibold"
              >
                Price
              </label>
              <input
                type="text"
                placeholder="e.g. 1000"
                id="productPrice"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
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
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="bg-slate-700 p-2 w-full rounded"
              />
            </div>
            <button className="bg-cyan-500 p-2 w-full rounded text-white hover:bg-cyan-600 mt-2 mb-2">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
