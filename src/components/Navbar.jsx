
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { IsLogin, setIsLogin } = useContext(AuthContext);

  const handleLogOut = () => {
    // ✅ fix token keys
    localStorage.removeItem("accessTokon");
    localStorage.removeItem("refreshTokon");
    setIsLogin(false);
    console.log("LOGGED OUT ✅");
    navigate("/login");
  };

  return (
  <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 
                border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
  {/* Logo */}
  <Link to="/" className="text-indigo-600 font-bold tracking-tight">
    <h1 className="text-3xl md:text-4xl lg:text-5xl drop-shadow-sm">Notes</h1>
  </Link>

  {/* Desktop Menu */}
  <div className="hidden sm:flex items-center gap-8 font-medium text-gray-700">
    <Link
      to="/"
      className="hover:text-indigo-600 transition-colors duration-300"
    >
      Home
    </Link>

    <Link
      to="/create-note"
      className="px-6 py-2 bg-green-500 hover:bg-green-600 transition-colors 
                 text-white rounded-xl shadow-sm"
    >
      Create Notes
    </Link>

    {IsLogin ? (
      <button
        onClick={handleLogOut}
        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition-colors 
                   text-white rounded-full shadow-sm"
      >
        Log Out
      </button>
    ) : (
      <Link
        to="/login"
        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition-colors 
                   text-white rounded-full shadow-sm"
      >
        Login
      </Link>
    )}
  </div>

  {/* Mobile Menu Button */}
  <button
    onClick={() => setOpen(!open)}
    aria-label="Menu"
    className="sm:hidden focus:outline-none"
  >
    <svg
      className="w-6 h-6 text-gray-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  {/* Mobile Dropdown */}
  <div
    className={`absolute top-[64px] left-0 w-full bg-white shadow-md border-t border-gray-200 
                flex-col items-start gap-4 px-6 py-6 text-gray-700 font-medium text-sm 
                transition-all duration-300 ease-in-out ${
                  open ? "flex opacity-100" : "hidden opacity-0"
                }`}
  >
    <Link to="/" className="block w-full hover:text-indigo-600">
      Home
    </Link>

    <Link
      to="/create-note"
      className="px-6 py-2 w-full text-center bg-green-500 hover:bg-green-600 
                 transition-colors text-white rounded-xl shadow-sm"
    >
      Create Notes
    </Link>

    {IsLogin ? (
      <button
        onClick={handleLogOut}
        className="px-6 py-2 w-full bg-indigo-500 hover:bg-indigo-600 
                   transition-colors text-white rounded-full shadow-sm"
      >
        Log Out
      </button>
    ) : (
      <Link
        to="/login"
        className="px-6 py-2 w-full bg-indigo-500 hover:bg-indigo-600 
                   transition-colors text-white rounded-full shadow-sm"
      >
        Login
      </Link>
    )}
  </div>
</nav>

  );
};

export default Navbar;
