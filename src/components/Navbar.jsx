import React, { useState, useEffect, useRef } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fake user data
  const [user, setUser] = useState({
    username: "John Doe",
    image: "https://i.pravatar.cc/40",
  });

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gray-800/50 backdrop-blur-lg shadow-md" : "bg-gray-800"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-400">
          ChatFlow
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-white font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-500 underline" : "hover:text-blue-400"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-500 underline" : "hover:text-blue-400"}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "text-blue-500 underline" : "hover:text-blue-400"}>Services</NavLink>
          {user && (<NavLink to="/dashboard/chat" className={({ isActive }) => isActive ? "text-blue-500 underline" : "hover:text-blue-400"}>Dashboard</NavLink>)}

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <img
                  src={user.image}
                  alt={user.username}
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu user={user} />
      </div>
    </nav>
  );
}

function MobileMenu({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button onClick={() => setOpen(!open)} className="text-white text-2xl">☰</button>
      {open && (
        <div className="absolute top-12 right-0 bg-gray-800 text-white shadow-lg rounded-xl w-48 py-4 flex flex-col gap-2">
          <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
          <Link to="/about" className="px-4 py-2 hover:bg-gray-700 rounded">About</Link>
          <Link to="/services" className="px-4 py-2 hover:bg-gray-700 rounded">Services</Link>
          {user && <Link to="/dashboard" className="px-4 py-2 hover:bg-gray-700 rounded">Dashboard</Link>}

          {!user ? (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg mx-4 mt-2">Login</button>
          ) : (
            <div className="flex flex-col items-center mt-2">
              <img src={user.image} alt={user.username} className="w-10 h-10 rounded-full border" />
              <span className="text-sm mt-1">{user.username}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
