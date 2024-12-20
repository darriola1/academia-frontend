"use client"

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {

    const pathname = usePathname();

    return (
        <div className="min-h-screen flex bg-white dark:bg-zinc-900 text-white">
            <Sidebar /> text-black
            <div className="flex-1 ml-64 p-8">
                <DashboardHeader titulo={pathname} className="ml-64 p-8" />
                <main>{children}</main>
            </div>
        </div>
    );
}
