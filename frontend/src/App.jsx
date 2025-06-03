import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer, toast } from "react-toastify";
import CartPage from "./pages/CartPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
const App = () => {
  const notify = () => toast("Wow so easy!");

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <div className="pt-12 pb-12">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
