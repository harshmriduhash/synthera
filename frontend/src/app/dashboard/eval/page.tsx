"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Shield, BarChart3, Clock, Database } from "lucide-react";
import { api } from "@/lib/api";

const S = {
    page: { display: "flex", flexDirection: "column" as const, height: "100%", overflow: "hidden", backgroundColor: "#0a0a0a" },
    header: {
        flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
    },
    title: { margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)" },
    subtitle: { margin: 0, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" as const },
    scroll: { flex: 1, overflowY: "auto" as const, padding: "32px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 1200, margin: "0 auto" },
    card: {
        padding: "24px", borderRadius: 20, backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" as const, gap: 16
    },
    statRow: { display: "flex", alignItems: "center", justifyContent: "space-between" },
    statValue: { fontSize: 32, fontWeight: 700, color: "white" },
    statLabel: { fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const, letterSpacing: "0.1em" },
    chartContainer: { height: 120, display: "flex", alignItems: "flex-end", gap: 4, padding: "8px 0" },
    bar: (height: number, active: boolean) => ({
        flex: 1, height: `${height}%`, borderRadius: "4px 4px 2px 2px",
        backgroundColor: active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)",
        transition: "all 0.3s"
    }),
    table: { width: "100%", borderCollapse: "separate" as const, borderSpacing: "0 8px" },
    th: { textAlign: "left" as const, padding: "0 12px", fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.2)", textTransform: "uppercase" as const },
    tr: { backgroundColor: "rgba(255,255,255,0.02)", transition: "all 0.2s" },
    td: { padding: "14px 12px", fontSize: 13, color: "rgba(255,255,255,0.6)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }
};

export default function EvalPage() {
    const [metrics, setMetrics] = useState<any[]>([]);
    const [stats, setStats] = useState({ avgLatency: 0, totalTokens: 0, avgScore: 0 });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await api.get("/chat/metrics");
                setMetrics(res);
                if (res.length > 0) {
                    const lat = res.reduce((acc: number, l: any) => acc + l.latency, 0) / res.length;
                    const tok = res.reduce((acc: number, l: any) => acc + l.token_usage, 0);
                    const sco = res.reduce((acc: number, l: any) => acc + l.validation_score, 0) / res.length;
                    setStats({ avgLatency: lat, totalTokens: tok, avgScore: sco });
                }
            } catch (err) {
                console.error("Failed to fetch metrics:", err);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div style={S.page}>
            <div style={S.header}>
                <div>
                    <h1 style={S.title}>Advanced Analytics</h1>
                    <p style={S.subtitle}>System Performance & Reasoning Audit</p>
                </div>
            </div>

            <div style={S.scroll}>
                <div style={S.grid}>
                    {/* Latency Card */}
                    <div style={S.card}>
                        <div style={S.statRow}>
                            <div style={{ padding: 12, borderRadius: 12, backgroundColor: "rgba(99,102,241,0.1)" }}>
                                <Clock size={20} color="#6366f1" />
                            </div>
                            <span style={S.statLabel}>Avg Latency</span>
                        </div>
                        <div style={S.statValue}>{stats.avgLatency.toFixed(2)}s</div>
                        <div style={S.chartContainer}>
                            {metrics.slice(0, 20).reverse().map((m, i) => (
                                <div key={i} style={S.bar((m.latency / 5) * 100, i === 19)} />
                            ))}
                        </div>
                    </div>

                    {/* Token Card */}
                    <div style={S.card}>
                        <div style={S.statRow}>
                            <div style={{ padding: 12, borderRadius: 12, backgroundColor: "rgba(16,185,129,0.1)" }}>
                                <Zap size={20} color="#10b981" />
                            </div>
                            <span style={S.statLabel}>Processing Load</span>
                        </div>
                        <div style={S.statValue}>{stats.totalTokens.toLocaleString()} <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)" }}>tkns</span></div>
                        <div style={S.chartContainer}>
                            {metrics.slice(0, 20).reverse().map((m, i) => (
                                <div key={i} style={S.bar((m.token_usage / 1000) * 100, i === 19)} />
                            ))}
                        </div>
                    </div>

                    {/* Validation Card */}
                    <div style={S.card}>
                        <div style={S.statRow}>
                            <div style={{ padding: 12, borderRadius: 12, backgroundColor: "rgba(245,158,11,0.1)" }}>
                                <Shield size={20} color="#f59e0b" />
                            </div>
                            <span style={S.statLabel}>Reasoning Accuracy</span>
                        </div>
                        <div style={S.statValue}>{(stats.avgScore * 100).toFixed(1)}%</div>
                        <div style={S.chartContainer}>
                            {metrics.slice(0, 20).reverse().map((m, i) => (
                                <div key={i} style={S.bar(m.validation_score * 100, i === 19)} />
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 48, maxWidth: 1200, margin: "48px auto 0" }}>
                    <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Execution Audit Trail (Last 50 Events)</p>
                    <table style={S.table}>
                        <thead>
                            <tr>
                                <th style={S.th}>Timestamp</th>
                                <th style={S.th}>Query Segment</th>
                                <th style={S.th}>Latency</th>
                                <th style={S.th}>Score</th>
                                <th style={S.th}>Usage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((m, i) => (
                                <tr key={i} style={S.tr}>
                                    <td style={{ ...S.td, width: 120 }}>{new Date(m.created_at).toLocaleTimeString()}</td>
                                    <td style={{ ...S.td, color: "white", fontWeight: 600 }}>{m.query.substring(0, 40)}...</td>
                                    <td style={S.td}>{m.latency.toFixed(2)}s</td>
                                    <td style={S.td}>{(m.validation_score * 100).toFixed(0)}%</td>
                                    <td style={S.td}>{m.token_usage} tokens</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
