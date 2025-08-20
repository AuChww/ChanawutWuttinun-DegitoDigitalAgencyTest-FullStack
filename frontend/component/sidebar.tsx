"use client"
import { useState } from "react";
import { FiHome, FiSearch, FiHeart, FiUser, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <FiHome />, href: "/" },
    { name: "Explore", icon: <FiSearch />, href: "/explore" },
    { name: "Trips", icon: <FiHeart />, href: "/trips" },
    { name: "Profile", icon: <FiUser />, href: "/profile" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col fixed top-0 left-0 h-full bg-blue-600 text-white w-24 py-6 items-center rounded-r-3xl rounded-br-3xl z-50">
        <div>Logo</div>
        <div className="items-center my-auto">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex flex-col items-center my-20 hover:text-gray-200">
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 h-20 text-white flex rounded-tr-3xl rounded-tl-3xl justify-around py-2 z-50">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex flex-col items-center mt-2">
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <main className="">{children}</main>
    </div>
  );
}
