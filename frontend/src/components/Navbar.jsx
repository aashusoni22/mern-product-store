import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { HiMiniShoppingBag } from "react-icons/hi2";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[var(--navbar-height)] w-full bg-slate-800">
      <div className="flex justify-between items-center  max-w-7xl mx-auto p-4 px-6">
        <Link to="/">
          <div className="flex gap-2 items-center">
            <HiMiniShoppingBag className="text-3xl text-white" />
            <h1 className="text-3xl font-bold text-cyan-400">Product Store</h1>
          </div>
        </Link>

        <ul className="flex gap-3">
          <li className="bg-slate-700 p-2 rounded text-white hover:bg-slate-600">
            <Link to="/">
              <MdHome className="text-2xl" />
            </Link>
          </li>
          <li className="bg-slate-700 p-2 rounded text-white hover:bg-slate-600">
            <Link to="/create">
              <IoMdAdd className="text-2xl" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
