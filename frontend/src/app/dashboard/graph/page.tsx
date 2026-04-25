"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Share2, Network, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { api } from "@/lib/api";

const S = {
    page: { display: "flex", flexDirection: "column" as const, height: "100%", overflow: "hidden", backgroundColor: "#0a0a0a" },
    header: {
        flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", zIndex: 10
    },
    title: { margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)" },
    subtitle: { margin: 0, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" as const },
    container: { flex: 1, position: "relative" as const, overflow: "hidden", cursor: "grab" },
    canvas: { display: "block" },
    toolbar: {
        position: "absolute" as const, bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, padding: "8px", borderRadius: 14,
        backgroundColor: "rgba(15,15,15,0.8)", border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)", zIndex: 20
    },
    toolBtn: {
        width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.2s"
    },
    legend: {
        position: "absolute" as const, top: 24, right: 24, padding: "16px", borderRadius: 16,
        backgroundColor: "rgba(15,15,15,0.5)", border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)", zIndex: 20
    },
    legendItem: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
    legendDot: (color: string) => ({ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }),
    legendText: { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)" }
};

const COLORS: Record<string, string> = {
    Company: "#ffffff",
    Person: "#6366f1",
    Metric: "#10b981",
    Date: "#f59e0b",
    default: "#94a3b8"
};

export default function GraphPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                const res = await api.get("/documents/graph");
                // deduplicate nodes
                const uniqueNodes = Array.from(new Map(res.nodes.map((n: any) => [n.id, n])).values());
                setGraphData({ nodes: uniqueNodes, links: res.links });
            } catch (err) {
                console.error("Failed to fetch graph data:", err);
            }
        };
        fetchGraph();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || graphData.nodes.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize
        const resize = () => {
            if (!containerRef.current) return;
            canvas.width = containerRef.current.clientWidth * window.devicePixelRatio;
            canvas.height = containerRef.current.clientHeight * window.devicePixelRatio;
            canvas.style.width = containerRef.current.clientWidth + "px";
            canvas.style.height = containerRef.current.clientHeight + "px";
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener("resize", resize);

        // Simple force-directed layout simulation (placeholder for real physics)
        const nodes = graphData.nodes.map((n, i) => ({
            ...n,
            x: n.x || (Math.random() - 0.5) * 500 + canvas.width / (2 * window.devicePixelRatio),
            y: n.y || (Math.random() - 0.5) * 500 + canvas.height / (2 * window.devicePixelRatio)
        }));

        let animationFrame: number;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(offset.x, offset.y);
            ctx.scale(zoom, zoom);

            // Draw Links
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.06)";
            ctx.lineWidth = 1;
            graphData.links.forEach(l => {
                const s = nodes.find(n => n.id === l.source);
                const t = nodes.find(n => n.id === l.target);
                if (s && t) {
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(t.x, t.y);
                }
            });
            ctx.stroke();

            // Draw Nodes
            nodes.forEach(n => {
                const color = COLORS[n.type] || COLORS.default;
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                ctx.fill();

                // Labels
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.font = "bold 9px Inter, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(n.label, n.x, n.y + 16);
            });

            ctx.restore();
            animationFrame = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrame);
        };
    }, [graphData, zoom, offset]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    return (
        <div style={S.page}>
            <div style={S.header}>
                <div>
                    <h1 style={S.title}>Knowledge Synapse</h1>
                    <p style={S.subtitle}>Relational Intelligence Map</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ ...S.toolBtn, backgroundColor: "rgba(255,255,255,0.05)", width: "auto", padding: "0 16px", fontSize: 12, fontWeight: 700, color: "white" }}>
                        <Share2 size={14} style={{ marginRight: 8 }} /> Share Graph
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                style={S.container}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <canvas ref={canvasRef} style={S.canvas} />

                <div style={S.legend}>
                    <p style={{ margin: "0 0 12px", fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Entity Node Index</p>
                    {Object.entries(COLORS).map(([type, color]) => type !== 'default' && (
                        <div key={type} style={S.legendItem}>
                            <span style={S.legendDot(color)} />
                            <span style={S.legendText}>{type}</span>
                        </div>
                    ))}
                </div>

                <div style={S.toolbar}>
                    <button style={S.toolBtn} onClick={() => setZoom(z => Math.min(z + 0.2, 3))}><ZoomIn size={18} /></button>
                    <button style={S.toolBtn} onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}><ZoomOut size={18} /></button>
                    <button style={S.toolBtn} onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}><Maximize2 size={18} /></button>
                    <div style={{ width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.08)", margin: "0 4px" }} />
                    <button style={S.toolBtn}><Network size={18} /></button>
                </div>
            </div>
        </div>
    );
}
