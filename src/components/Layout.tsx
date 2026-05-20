import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../features/hooks/useAuth";


export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const navItems = [
    {
      path: "/",
      icon: LayoutDashboard,
      label: "Dashboard",
    },

    {
      path: "/food-items",
      icon: UtensilsCrossed,
      label: "Food Items",
    },

    {
      path: "/orders",
      icon: ShoppingCart,
      label: "Orders",
    },

    {
      path: "/profile",
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">

        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-orange-600">
            FoodAdmin
          </h1>

          <p className="text-sm text-gray-500">
            Admin Dashboard
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (
                item.path !== "/" &&
                location.pathname.startsWith(item.path)
              );

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all w-full"
          >
            <LogOut size={20} />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">

          <h2 className="text-xl font-semibold text-gray-800">
            {
              navItems.find(
                (item) => item.path === location.pathname
              )?.label || "Dashboard"
            }
          </h2>

          {/* User Info */}
          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {user?.name || "Admin"}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email || "No Email"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <User
                size={20}
                className="text-orange-600"
              />
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}