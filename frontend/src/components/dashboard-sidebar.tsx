"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { MessageSquare, Files, Activity, Database, Settings, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
    const pathname = usePathname();

    const items = [
        { name: "Chat", icon: MessageSquare, path: "/dashboard" },
        { name: "Documents", icon: Files, path: "/dashboard/documents" },
        { name: "Intelligence Feed", icon: Activity, path: "/dashboard/feed" },
        { name: "Metrics", icon: BarChart3, path: "/dashboard/metrics" },
        { name: "Knowledge Graph", icon: Database, path: "/dashboard/graph" },
        { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    ];

    return (
        <Sidebar className="border-r border-white/5 bg-[#080B14]">
            <SidebarHeader className="p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white">S</div>
                    <span className="text-xl font-bold tracking-tight">SYNTHERA</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="px-4">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.name} className="mb-1">
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.path}
                                className={`py-6 rounded-xl hover:bg-white/5 transition-colors ${pathname === item.path ? 'bg-primary/10 text-primary' : 'text-slate-400'}`}
                            >
                                <Link href={item.path} className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium text-sm">{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
