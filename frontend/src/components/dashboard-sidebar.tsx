"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, Files, Activity, Database, Settings, BarChart3, LogOut, User as UserIcon } from "lucide-react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";

const NAV = [
    { label: "Chat", icon: MessageSquare, href: "/dashboard" },
    { label: "Documents", icon: Files, href: "/dashboard/documents" },
    { label: "Intelligence Feed", icon: Activity, href: "/dashboard/feed" },
    { label: "Metrics", icon: BarChart3, href: "/dashboard/metrics" },
    { label: "Knowledge Graph", icon: Database, href: "/dashboard/graph" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { user } = useUser();

    return (
        <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                width: "240px",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#080808",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
                flexShrink: 0,
            }}
        >
            {/* Logo */}
            <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                    <div style={{
                        width: 36, height: 36, background: "#fff", borderRadius: 10,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 900, fontSize: 18, color: "#000", flexShrink: 0,
                    }}>S</div>
                    <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap" }}>
                        SYNTHERA
                    </span>
                </Link>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto", overflowX: "hidden" }}>
                {NAV.map((item) => {
                    const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 12px",
                                marginBottom: "2px",
                                borderRadius: "10px",
                                textDecoration: "none",
                                backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                                color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.38)",
                                transition: "background-color 0.15s, color 0.15s",
                            }}
                            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                        >
                            <Icon size={16} style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

                {/* Logout Button */}
                <SignOutButton>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            marginTop: "8px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "rgba(255,255,255,0.38)",
                            transition: "background-color 0.15s, color 0.15s",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "rgba(255,255,255,0.38)";
                        }}
                    >
                        <LogOut size={16} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>Logout</span>
                    </div>
                </SignOutButton>
            </nav>

            {/* Status badge & User Profile */}
            <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                    borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
                }}>
                    <UserButton appearance={{ elements: { userButtonAvatarBox: "w-7 h-7" } }} />
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user?.fullName || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "User"}
                        </span>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Enterprise Plan</span>
                    </div>
                </div>

                <div style={{
                    padding: "12px 14px", borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)", display: "inline-block", flexShrink: 0 }} />
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                            Nodes Active
                        </span>
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: "85%", height: "100%", background: "rgba(255,255,255,0.2)", borderRadius: 99 }} />
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}
