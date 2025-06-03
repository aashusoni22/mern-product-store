import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { RiShoppingCartLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const location = useLocation();

  const menuItems = [
    {
      name: "home",
      icon: <MdHome className="text-2xl" />,
      path: "/",
      label: "Home",
    },
    {
      name: "create",
      icon: <IoMdAdd className="text-2xl" />,
      path: "/create",
      label: "Create",
    },
    {
      name: "cart",
      icon: <RiShoppingCartLine className="text-2xl" />,
      path: "/cart",
      label: "Cart",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.path === currentPath);
    setActiveMenu(activeItem ? activeItem.name : "home");
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[var(--navbar-height)] w-full bg-slate-800/95 backdrop-blur-sm z-50 border-b border-slate-700/50">
      <div className="flex justify-between items-center p-4 px-6 max-w-7xl mx-auto">
        <Link to="/" className="flex gap-2 items-center group">
          <HiMiniShoppingBag className="text-3xl text-cyan-500 group-hover:scale-110 transition-transform duration-200" />
          <h1 className="text-2xl font-semibold text-white md:text-3xl">
            <span className="text-cyan-500">Nexus</span>Store
          </h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>

          {isMobileMenuOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-slate-800 backdrop-blur-sm z-50 flex flex-col animate-fadeIn">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700/50">
                <Link to="/" className="flex gap-2 items-center">
                  <HiMiniShoppingBag className="text-3xl text-cyan-500" />
                  <h1 className="text-2xl font-semibold text-white">
                    <span className="text-cyan-500">Nexus</span>Store
                  </h1>
                </Link>
                <button
                  className="text-white bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>
              <ul className="flex flex-col gap-2 px-4 py-4 bg-slate-800">
                {menuItems.map((menu) => (
                  <li key={menu.name}>
                    <Link
                      to={menu.path}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-colors duration-200 ${
                        activeMenu === menu.name
                          ? "bg-cyan-500 text-white"
                          : "text-slate-300 hover:bg-slate-700/50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {menu.icon}
                      <span className="font-medium">{menu.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:gap-2">
          {menuItems.map((menu) => (
            <li key={menu.name}>
              <Link
                to={menu.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeMenu === menu.name
                    ? "bg-cyan-500 text-white"
                    : "text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {menu.icon}
                <span className="font-medium">{menu.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
