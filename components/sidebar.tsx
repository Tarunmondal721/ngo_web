"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import {
  LayoutDashboard,
  Users,
  Image,
  HeartHandshake,
  UserCircle,
  LogOut,
  FileText,
  Calendar,
  Menu,
  X,
} from "lucide-react";

export default function SidebarPage() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "User Manage", href: "/admin/users", icon: Users },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Category", href: "/admin/category", icon: FileText },
    { name: "Events", href: "/admin/event", icon: Calendar },
    { name: "Donation", href: "/admin/donations", icon: HeartHandshake },
    { name: "Profile", href: "/admin/profile", icon: UserCircle },
    { name: "Logout", href: "#", icon: LogOut, action: "logout" },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      await signOut({ callbackUrl: "/login" });
    }
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-lg text-white shadow-lg hover:bg-blue-700 transition duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col shadow-2xl transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Profile Section */}
        <div className="p-6 text-center border-b border-gray-700 flex flex-col items-center">
          <img
            src={
              session?.user?.profile_picture ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md mb-3 object-cover transition-transform hover:scale-105"
          />
          <h1 className="text-lg font-semibold text-white">
            {session?.user?.name ?? "Admin"}
          </h1>
          <p className="text-sm text-gray-400">{session?.user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/admin' ? pathname === '/admin' : pathname === item.href || pathname.startsWith(`${item.href}/`);


              if (item.action === "logout") {
                return (
                  <li key={item.name}>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-gray-300 hover:bg-red-600 hover:text-white transition duration-200"
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200
                      ${isActive
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Your NGO
        </div>
      </aside>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 md:ml-64 h-16 bg-white shadow-lg flex items-center justify-between px-6 z-30">
        <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        <div className="flex items-center gap-3">
          <img
            src={
              session?.user?.profile_picture ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-800">{session?.user?.name}</p>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
      </header>
    </>
  );
}