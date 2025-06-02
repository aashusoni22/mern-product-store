import { Link, useParams } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useCartStore } from "../store/cart";
import { Bounce, toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProduct, selectedProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const [added, setAdded] = useState(false);

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
    return <div className="mt-20 text-white">Loading...</div>;

  return (
    <div className="mt-12 md:mt-20 flex flex-col max-w-7xl mx-auto px-6 text-white">
      <Link to="/" className="flex gap-2 items-center">
        <IoArrowBackCircleOutline className="text-2xl text-white cursor-pointer" />
        <p>Back to Products</p>
      </Link>
      <div className="mt-10 flex flex-col md:flex-row gap-5 mb-5 md:mb-0">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="max-w-[500px] max-h-[500px] aspect-square w-full object-cover rounded"
        />
        <div className="flex flex-col md:ml-12">
          <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
          <p className="mt-4 text-lg">$ {selectedProduct.price}</p>
          <div className="mt-8">
            <p className="text-slate-500">Description</p>
            <p className="mt-2">
              {selectedProduct.description.length > 500
                ? selectedProduct.description.substring(0, 500).concat("...")
                : selectedProduct.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex">
            <button
              onClick={handleToCart}
              className={`${
                added ? "bg-emerald-500" : "bg-cyan-500"
              } px-4 py-2 rounded hover:${
                added ? "bg-emerald-600" : "bg-cyan-600"
              } w-36 transform active:scale-95 transition duration-50 ease-in flex items-center justify-center`}
            >
              {added ? (
                <span className="flex items-center gap-2">
                  <FaCheck className="text-2xl" /> Added
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button className="ml-4 bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-600 transform active:scale-95 transition duration-50 ease-in">
              Buy Now
            </button>
          </div>

          <div className="mt-10 text-sm text-slate-500">
            <p>Product ID: {selectedProduct._id}</p>
            <p className="mt-1">
              Posted on:{" "}
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
  );
};

export default ProductDetails;
