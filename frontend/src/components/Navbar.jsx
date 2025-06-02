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
    },
    {
      name: "create",
      icon: <IoMdAdd className="text-2xl" />,
      path: "/create",
    },
    {
      name: "cart",
      icon: <RiShoppingCartLine className="text-2xl" />,
      path: "/cart",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.path === currentPath);
    setActiveMenu(activeItem ? activeItem.name : "home");
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[var(--navbar-height)] w-full bg-slate-800 z-50">
      <div className="flex justify-between items-center p-4 px-6">
        <Link to="/">
          <div className="flex gap-2 items-center">
            <HiMiniShoppingBag className="text-3xl text-white" />
            <h1 className="text-2xl font-semibold text-cyan-400 md:text-3xl">
              Product Store
            </h1>
          </div>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white bg-slate-700 p-2 rounded hover:bg-slate-600"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>

          {isMobileMenuOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-slate-800 z-50 flex flex-col p-4 gap-4">
              <button
                className="absolute top-4 right-6 text-white bg-slate-700 p-2 rounded hover:bg-slate-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IoClose className="text-2xl" />
              </button>
              <ul className="flex flex-col gap-4 pt-20 px-5">
                {menuItems.map((menu) => (
                  <li
                    key={menu.name}
                    className={`${
                      activeMenu === menu.name ? "bg-cyan-500" : "bg-slate-700"
                    } p-4 w-full rounded text-white hover:bg-slate-600`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to={menu.path}>
                      <span className="flex gap-2 items-center font-semibold">
                        {menu.icon}
                        {menu.name.charAt(0).toUpperCase() + menu.name.slice(1)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ul className="hidden md:flex md:gap-3">
          {menuItems.map((menu) => (
            <li
              key={menu.name}
              className={`${
                activeMenu === menu.name
                  ? "bg-cyan-500"
                  : "bg-slate-700 hover:bg-slate-600"
              } p-2 rounded text-white`}
            >
              <Link to={menu.path}>{menu.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
