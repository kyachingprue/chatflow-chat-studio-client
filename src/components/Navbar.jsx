import React, { useState, useEffect, useRef } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  console.log("user data -->", user);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full mx-auto z-50 transition-all duration-300 shadow-md ${isScrolled ? "bg-gray-800/50 backdrop-blur-lg" : "bg-gray-800"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-400">
          ChatFlow
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 hover:underline" : "hover:text-blue-900 text-white"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 underline" : "hover:text-blue-600 text-white"}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "text-blue-600 underline" : "hover:text-blue-600 text-white"}>Services</NavLink>
          {user && (<NavLink to="/dashboard/chat" className={({ isActive }) => isActive ? "text-blue-600 underline" : "hover:text-blue-600 text-white"}>Dashboard</NavLink>)}

          {/* Login Button / User Avatar */}
          <div className="relative" ref={dropdownRef}>
            {!user ? (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Login
                </button>
              </Link>
            ) : (
              <>
                {/* Avatar */}
                <img
                    src={user ? user?.image : "https://i.ibb.co.com/gbVvwDHp/360-F-724597608-pmo5-Bs-Vum-Fc-Fy-HJKl-ASG2-Y2-Kpkkfi-YUU.jpg"}
                  alt="User"
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />

                {/* Dropdown Card */}
                {open && (
                  <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-300 rounded-xl shadow-2xl p-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <MobileMenu user={user} />
      </div>
    </nav>
  );
}

function MobileMenu({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="text-white text-xl">
        ☰
      </button>

      {open && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-xl w-48 py-4 flex flex-col text-gray-700">
          <Link to="/" className="px-4 py-2 hover:bg-gray-100">Home</Link>
          <Link to="/about" className="px-4 py-2 hover:bg-gray-100">About</Link>
          <Link to="/services" className="px-4 py-2 hover:bg-gray-100">Services</Link>
          {user && <Link to="/dashboard" className="px-4 py-2 hover:bg-gray-100">Dashboard</Link>}

          

          {!user ? (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg mx-4 mt-2">
              Login
            </button>
          ) : (
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-10 h-10 rounded-full border mx-auto mt-2"
            />
          )}
        </div>
      )}
    </div>
  );
}
