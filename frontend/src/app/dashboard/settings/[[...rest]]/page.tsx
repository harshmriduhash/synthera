"use client";

import { UserProfile } from "@clerk/nextjs";
import { motion } from "framer-motion";

const PAGE = { display: "flex", flexDirection: "column" as const, height: "100%", overflow: "hidden", backgroundColor: "#0a0a0a" };
const HEADER = { flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(0,0,0,0.4)" };
const SCROLL = { flex: 1, overflowY: "auto" as const, overflowX: "hidden" as const, minHeight: 0, padding: "32px" };
const INNER = { maxWidth: 1000, margin: "0 auto" };

export default function SettingsPage() {
    return (
        <div style={PAGE}>
            <div style={HEADER}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>Configuration Node</p>
                <p style={{ margin: "3px 0 0", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" }}>System & Identity Management</p>
            </div>

            <div style={SCROLL}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={INNER}
                >
                    <UserProfile
                        routing="path"
                        path="/dashboard/settings"
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "bg-transparent border-none shadow-none",
                                navbar: "hidden",
                                pageScrollBox: "p-0",
                                headerTitle: "text-white text-xl font-bold",
                                headerSubtitle: "text-white/40",
                                profileSectionTitle: "text-white/60 border-white/10",
                                profileSectionContent: "text-white/80",
                                formButtonPrimary: "bg-white text-black hover:bg-white/90 rounded-lg",
                                formFieldLabel: "text-white/50",
                                formFieldInput: "bg-white/5 border-white/10 text-white rounded-lg",
                                accordionTrigger: "text-white hover:bg-white/5",
                                badge: "bg-white/10 text-white/60",
                            }
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
