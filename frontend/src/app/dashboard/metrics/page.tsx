"use client";

import { BarChart3, TrendingUp, ShieldAlert, Cpu, Activity, Zap } from "lucide-react";

const PAGE = { display: "flex", flexDirection: "column" as const, height: "100%", overflow: "hidden", backgroundColor: "#0a0a0a" };
const HEADER = { flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(0,0,0,0.4)" };
const SCROLL = { flex: 1, overflowY: "auto" as const, overflowX: "hidden" as const, minHeight: 0, padding: "28px 32px" };
const INNER = { maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column" as const, gap: 24 };
const CARD = { padding: "24px", borderRadius: 14, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" };

const KPIs = [
    { label: "Avg Latency", value: "2.4ms", Icon: Cpu },
    { label: "Accuracy", value: "98.2%", Icon: TrendingUp },
    { label: "Divergence", value: "0.1%", Icon: ShieldAlert },
    { label: "Queries", value: "1,284", Icon: BarChart3 },
];
const BARS = [40, 60, 45, 90, 30, 70, 50, 80, 45, 65, 30, 85];
const AGENTS = [
    { name: "Retriever", pct: 95 },
    { name: "Extractor", pct: 88 },
    { name: "Reasoner", pct: 92 },
    { name: "Validator", pct: 99 },
];

export default function MetricsPage() {
    return (
        <div style={PAGE}>
            <div style={HEADER}>
                <div>
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>Performance Node</p>
                    <p style={{ margin: "3px 0 0", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Real-time Evaluation Metrics</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 999, backgroundColor: "rgba(255,255,255,0.03)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    <Activity size={12} />Health: Optimal
                </div>
            </div>

            <div style={SCROLL}>
                <div style={INNER}>
                    {/* KPI Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                        {KPIs.map(({ label, value, Icon }) => (
                            <div key={label} style={CARD}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
                                    <Icon size={14} color="rgba(255,255,255,0.2)" />
                                </div>
                                <p style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,0.82)", letterSpacing: "-0.03em" }}>{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                        {/* Bar Chart */}
                        <div style={CARD}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Latency Flow</p>
                                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>Last 12 reasoning cycles</p>
                                </div>
                                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.07)", padding: "3px 8px", borderRadius: 6 }}>Live</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
                                {BARS.map((h, i) => (
                                    <div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "3px 3px 0 0", borderTop: "1px solid rgba(255,255,255,0.12)", transition: "background 0.15s" }} />
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                                    <span key={d} style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>{d}</span>
                                ))}
                            </div>
                        </div>

                        {/* Agent Health */}
                        <div style={CARD}>
                            <p style={{ margin: "0 0 20px", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Agentic Health</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                {AGENTS.map(({ name, pct }) => (
                                    <div key={name}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{name}</span>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>{pct}%</span>
                                        </div>
                                        <div style={{ height: 3, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                                            <div style={{ width: `${pct}%`, height: "100%", backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 99 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <Zap size={13} color="rgba(255,255,255,0.22)" />
                                    <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}>All Nodes Optimal</span>
                                </div>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
