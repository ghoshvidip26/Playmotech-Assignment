"use client";

import Link from "next/link";
import { LayoutDashboard, Upload, History, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
const links = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Upload",
        href: "/upload",
        icon: Upload,
    },
    {
        label: "History",
        href: "/history",
        icon: History,
    },
];

export default function Sidebar() {
    const router = useRouter();
    const logOut = () => {
        localStorage.clear();
        router.push("/login")
    }

    return (
        <aside className="w-72 border-r bg-white">
            <div className="p-6">
                <h1 className="text-2xl font-bold">
                    🏏 Ghost Coach
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Cricket Coaching Assistant
                </p>
            </div>

            <nav className="space-y-2 px-4">
                {links.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100"
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-5 px-4">
                <button onClick={logOut} className="flex items-center gap-2 text-red-500">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}