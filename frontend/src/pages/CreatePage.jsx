import { useState } from "react";
import { useProductStore } from "../store/product";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
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
      description: "",
      image: "",
    });
  };

  return (
    <div className="mt-12 py-6 flex flex-col max-w-7xl mx-auto px-6 text-white">
      <div className="flex items-center gap-2 mb-8">
        <IoArrowBackCircleOutline
          className="text-2xl text-white cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl font-semibold">Create New Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <form className="space-y-6" onSubmit={handleProductSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Premium T-Shirt"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full pl-8 pr-3 py-2 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe your product..."
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  rows="4"
                  className="w-full px-3 py-2 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Image URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                  <MdOutlineAddPhotoAlternate className="absolute left-3 top-2.5 text-xl text-slate-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded flex items-center justify-center gap-2 transition duration-200"
            >
              Create Product
            </button>
          </form>
        </div>

        {/* Right Column - Preview */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Product Preview</h2>
          <div className="space-y-4">
            {newProduct.image && (
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={newProduct.image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {newProduct.name || "Product Name"}
              </h3>
              <p className="text-cyan-500 font-medium">
                ${newProduct.price || "0.00"}
              </p>
              <p className="text-slate-400">
                {newProduct.description || "No description provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
