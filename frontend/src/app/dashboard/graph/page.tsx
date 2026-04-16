"use client";

import { useEffect, useState } from "react";
import { Layers, Share2, Zap } from "lucide-react";
import { api } from "@/lib/api";

const PAGE = { display: "flex", flexDirection: "column" as const, height: "100%", overflow: "hidden", backgroundColor: "#0a0a0a" };
const HEADER = { flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(0,0,0,0.4)" };
const SCROLL = { flex: 1, overflowY: "auto" as const, overflowX: "hidden" as const, minHeight: 0, padding: "28px 32px" };
const INNER = { maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column" as const, gap: 24 };
const CARD = { padding: "24px", borderRadius: 14, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" };

const labelStyle = { margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" as const };

export default function GraphPage() {
    const [entities, setEntities] = useState<any[]>([]);
    const [relations, setRelations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [e, r] = await Promise.all([api.get("/documents/entities"), api.get("/documents/relations")]);
                setEntities(e);
                setRelations(r);
            } catch {/* silent */ } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div style={PAGE}>
            <div style={HEADER}>
                <div>
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>Knowledge Graph</p>
                    <p style={{ margin: "3px 0 0", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Entity & Relation Map</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 999, backgroundColor: "rgba(255,255,255,0.03)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    <Zap size={12} />Live
                </div>
            </div>

            <div style={SCROLL}>
                <div style={INNER}>
                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                        {[
                            { label: "Total Nodes", val: loading ? "…" : entities.length, Icon: Layers },
                            { label: "Relations", val: loading ? "…" : relations.length, Icon: Share2 },
                            { label: "Confidence", val: "98.4%", Icon: Zap },
                        ].map(({ label, val, Icon }) => (
                            <div key={label} style={CARD}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
                                    <Icon size={14} color="rgba(255,255,255,0.2)" />
                                </div>
                                <p style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,0.82)", letterSpacing: "-0.03em" }}>{val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Two-column panels */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 18 }}>
                        {/* Nodes */}
                        <div style={CARD}>
                            <p style={labelStyle}>Extracted Nodes</p>
                            {loading ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 40 }} />)}
                                </div>
                            ) : entities.length === 0 ? (
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: "32px 0" }}>No nodes yet — upload documents first.</p>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {entities.map((e, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.72)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: 8 }}>{e.name}</span>
                                            <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", border: "1px solid rgba(255,255,255,0.07)", padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>{e.type}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Relations */}
                        <div style={CARD}>
                            <p style={labelStyle}>Active Synapses</p>
                            {loading ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 60 }} />)}
                                </div>
                            ) : relations.length === 0 ? (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 160, border: "1.5px dashed rgba(255,255,255,0.08)", borderRadius: 10 }}>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>No relations identified yet.</p>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {relations.map((r, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                                            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.75)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.subject}</span>
                                            <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0, whiteSpace: "nowrap" }}>→ {r.relation} →</span>
                                            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>{r.object}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
