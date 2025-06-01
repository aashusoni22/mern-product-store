import { RiShoppingCartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsCartXFill } from "react-icons/bs";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main>
      <div className="flex flex-col max-w-7xl mx-auto px-4 py-4 sm:px-6 mt-12">
        <div className="flex gap-2 items-center">
          <RiShoppingCartFill className="text-3xl text-white" />
          <h1 className="text-3xl font-bold text-white">Current Products</h1>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center mt-40">
            <BsCartXFill className="text-4xl text-slate-400 mb-4" />
            <p className="text-slate-400 text-lg font-semibold">
              No Products Available!{" "}
              <span className="text-cyan-400 underline">
                <Link to="/create">Create a Product</Link>
              </span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
