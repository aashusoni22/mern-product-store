import { RiShoppingCartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsCartXFill } from "react-icons/bs";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { IoSearchOutline } from "react-icons/io5";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) => {
    if (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return product;
  });

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="flex flex-col max-w-7xl mx-auto px-6 py-4 sm:px-6 mt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <RiShoppingCartFill className="text-2xl md:text-2xl text-cyan-500" />
            <h1 className="text-2xl md:text-2xl font-semibold text-white">
              Current Products
            </h1>
          </div>
          <Link
            to="/create"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-fit transition duration-200"
          >
            <span className="text-xl">+</span>
            Add New Product
          </Link>
        </div>

        {/* Search Section */}
        <div className="relative">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-slate-400 text-white transition duration-200"
          />
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 bg-slate-800/50 rounded-lg p-8">
            <BsCartXFill className="text-6xl text-slate-400 mb-4" />
            <p className="text-slate-400 text-lg font-semibold text-center">
              No Products Available!{" "}
              <Link
                to="/create"
                className="text-cyan-500 hover:text-cyan-400 underline"
              >
                Create your first product
              </Link>
            </p>
          </div>
        )}

        {/* No Results State */}
        {products.length > 0 && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 bg-slate-800/50 rounded-lg p-8">
            <IoSearchOutline className="text-6xl text-slate-400 mb-4" />
            <p className="text-slate-400 text-lg font-semibold text-center">
              No products found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
