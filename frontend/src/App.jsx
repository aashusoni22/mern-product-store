import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const notify = () => toast("Wow so easy!");

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <div className="pt-[var(--navbar-height)]">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
