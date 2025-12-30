import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logoutUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey:["mongoUser", user?.email],
    queryFn: async() => {
    if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
    return res.data;
  }});

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

  const handleLogout = async () => {
    console.log("User logout");
    await logoutUser()
    toast.success("Logout successful")
  }

  if (isLoading) {
    return <LoadingSpinner/>
  }

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
          {user && (<NavLink to={userData.role == "admin" ? "/dashboard/admin/overview" : "/dashboard/chat"} className={({ isActive }) => isActive ? "text-blue-500 underline" : "hover:text-blue-400"}>Dashboard</NavLink>)}

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <div className="relative" ref={dropdownRef}>
                  {/* Avatar */}
                  <img
                    src={userData?.image || "https://i.ibb.co/17761113/default-profile.png"}
                    alt={userData?.name || "User"}
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-indigo-500 transition"
                  />

                  {/* Dropdown Card */}
                  {open && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                      {/* Profile */}
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                        onClick={() => setOpen(false)}
                      >
                        <User size={18} className="text-gray-600" />
                        <span className="text-gray-700 font-medium">Profile</span>
                      </Link>

                      <hr />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition"
                      >
                        <LogOut size={18} className="text-red-500" />
                        <span className="text-red-500 font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
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
  const axiosSecure = useAxiosSecure();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["mongoUser", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="md:hidden relative">
      <button onClick={() => setOpen(!open)} className="text-white text-2xl">☰</button>
      {open && (
        <div className="absolute top-12 right-0 bg-gray-800 text-white shadow-lg rounded-xl w-48 py-4 flex flex-col gap-2">
          <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
          <Link to="/about" className="px-4 py-2 hover:bg-gray-700 rounded">About</Link>
          <Link to="/services" className="px-4 py-2 hover:bg-gray-700 rounded">Services</Link>
          {user && <Link to={userData.role === "user" ? "/dashboard/chat": "/dashboard/admin/overview"} className="px-4 py-2 hover:bg-gray-700 rounded">Dashboard</Link>}
          {user && <Link to="/profile" className="px-4 py-2 hover:bg-gray-700 rounded">Profile</Link>}

          {!user ? (
            <Link to="/login" className="w-full">
              <button className="px-10 py-2 bg-blue-600 text-white rounded-lg mx-7 mt-2">Login</button>
            </Link>
          ) : (
            <div className="flex flex-col items-center mt-2">
                <img src={userData?.image || "https://i.ibb.co/17761113/default-profile.png"} alt={userData?.name || "User"} className="w-10 h-10 rounded-full border" />
                <span className="text-sm mt-1">{userData?.name || "User"}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
