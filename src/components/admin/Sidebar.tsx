"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "🏠" },
  { name: "Mobil", href: "/admin/cars", icon: "🚗" },
  { name: "Brand", href: "/admin/brands", icon: "🏷️" },
  { name: "Model", href: "/admin/models", icon: "📋" },
  { name: "Dealer", href: "/admin/dealers", icon: "🏢" },
  { name: "User", href: "/admin/users", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-slate-900 text-white">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        MobilSiap
      </div>

      <nav className="mt-4">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`flex items-center gap-3 px-6 py-3 transition ${
              pathname === menu.href
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            <span>{menu.icon}</span>
            <span>{menu.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
