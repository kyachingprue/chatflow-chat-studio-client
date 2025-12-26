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
  Bell,
} from "lucide-react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isRole = "user"; // Change to "admin" to test admin UI

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
    <div className={`min-h-screen flex flex-col lg:flex-row ${backgroundStyle} text-white`}>

      {/* LARGE DEVICE SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col transition-all duration-300
        ${isOpen ? "w-64" : "w-20"} bg-white/5 backdrop-blur-xl border-r border-white/10`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <h2 className="text-xl font-bold">
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
                  : "hover:bg-white/10"}`
              }
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* SMALL DEVICE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 flex justify-around p-2 z-50">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-xs text-white transition
              ${isActive ? "text-pink-400" : "text-white/70 hover:text-pink-300"}`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-linear-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
              ChatFlow
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            <img
              src="https://i.ibb.co/vC5WKqSk/9187532.png"
              alt="Profile"
              className="w-10 h-10 rounded-full ring-2 ring-pink-500"
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
