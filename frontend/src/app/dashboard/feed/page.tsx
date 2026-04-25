"use client";

import { motion } from "framer-motion";
import { Activity, Bell, Zap } from "lucide-react";

const S = {
    page: { display: "flex", flexDirection: "column" as const, height: "100%", backgroundColor: "#0a0a0a" },
    header: { flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(0,0,0,0.4)" },
    scroll: { flex: 1, overflowY: "auto" as const, padding: "32px" },
    inner: { maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column" as const, gap: "16px" },
    card: {
        padding: "20px", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "20px", alignItems: "flex-start"
    },
    iconWrap: (color: string) => ({
        width: 44, height: 44, borderRadius: 12, backgroundColor: `${color}10`,
        display: "flex", alignItems: "center", justifyContent: "center", color: color, flexShrink: 0
    }),
};

export default function FeedPage() {
    const items = [
        { title: "Anomaly Detected", desc: "Unusual spending pattern detected in Q3 Financial Report.", type: "anomaly", time: "2h ago", color: "#ef4444" },
        { title: "New Trend", desc: "Operating margin shows a 15% upward trend over the last 3 documents.", type: "trend", time: "5h ago", color: "#3b82f6" },
        { title: "Node Unified", desc: "Standard Charter Annual Report 2025 has been indexed and cross-correlated.", type: "event", time: "1d ago", color: "#10b981" },
    ];

    return (
        <div style={S.page}>
            <div style={S.header}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>Intelligence Feed</p>
                <p style={{ margin: "3px 0 0", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Real-time Signal Stream</p>
            </div>

            <div style={S.scroll}>
                <div style={S.inner}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            style={S.card}
                        >
                            <div style={S.iconWrap(item.color)}>
                                {item.type === 'anomaly' ? <Activity size={20} /> : <Zap size={20} />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{item.title}</h3>
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.time}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
