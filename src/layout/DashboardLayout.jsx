import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  MessageSquare,
  Users,
  UserPlus,
  Compass,
  Menu,
  Shield,
  BarChart3,
  Flag,
} from "lucide-react";

const DashboardLayout = () => {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isRole = user?.role || "user"; 

  const [isOpen, setIsOpen] = useState(true);

  const userMenu = [
    { name: "Chat", icon: MessageSquare, path: "/dashboard/chat" },
    { name: "Group Chat", icon: Users, path: "/dashboard/group-chat" },
    { name: "Friends", icon: Users, path: "/dashboard/friends" },
    { name: "Add Friend", icon: UserPlus, path: "/dashboard/add-friend" },
    { name: "Explore", icon: Compass, path: "/dashboard/explore" },
  ];

  const adminMenu = [
    { name: "Overview", icon: BarChart3, path: "/dashboard/admin/overview" },
    { name: "User Management", icon: Users, path: "/dashboard/admin/users" },
    { name: "Chat Control", icon: MessageSquare, path: "/dashboard/admin/chats" },
    { name: "Reports", icon: Flag, path: "/dashboard/admin/reports" },
    { name: "Security", icon: Shield, path: "/dashboard/admin/security" },
  ];

  const menuItems = isRole === "admin" ? adminMenu : userMenu;

  const backgroundStyle =
    isRole === "admin"
      ? "bg-gradient-to-br from-slate-950 via-gray-900 to-black"
      : "bg-gradient-to-br from-black via-purple-950 to-pink-950";

  return (
    <div className={`min-h-screen flex ${backgroundStyle} text-white`}>

      {/* SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
        bg-white/5 backdrop-blur-xl border-r border-white/10`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <h2 className="text-xl font-bold tracking-wide">
              {isRole === "admin" ? "Admin Panel" : "Dashboard"}
            </h2>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <Menu />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-xl transition
                ${isActive
                  ? isRole === "admin"
                    ? "bg-linear-to-r from-emerald-600 to-cyan-600"
                    : "bg-linear-to-r from-pink-600 to-purple-600"
                  : "hover:bg-white/10"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span className="font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* MOBILE SIDEBAR */}
      <aside className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-around py-3 z-50">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <item.icon className="w-6 h-6" />
          </NavLink>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <header className="h-16 flex items-center justify-between px-6
          bg-white/5 backdrop-blur-xl border-b border-white/10">

          <Link to="/">
            <h1
              className={`text-2xl font-bold bg-linear-to-r
              ${isRole === "admin"
                  ? "from-emerald-400 to-cyan-400"
                  : "from-pink-500 to-purple-400"
                }
              bg-clip-text text-transparent`}
            >
              ChatFlow {isRole === "admin" && "Admin"}
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {isRole === "admin" && (
              <span className="px-3 py-1 text-sm rounded-full bg-emerald-600/20 text-emerald-400">
                Admin Access
              </span>
            )}
            {isRole === "user" && (
              <span className="px-3 py-1 text-sm rounded-full bg-black text-white">
                user Access
              </span>
            )}

            <img
              src={
                user?.image ||
                "https://i.ibb.co/vC5WKqSk/9187532.png" // default avatar
              }
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-500 cursor-pointer"
            />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
