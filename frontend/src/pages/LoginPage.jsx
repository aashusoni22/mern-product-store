import { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-[89vh] flex items-center justify-center bg-slate-950 p-4 md:p-0">
      <div className="bg-slate-800 p-5 md:p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xl text-slate-400">
                <MdEmail />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xl text-slate-400">
                <MdLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full pl-10 pr-3 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaSignInAlt className="text-xl" />
            Login
          </button>
        </form>
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
