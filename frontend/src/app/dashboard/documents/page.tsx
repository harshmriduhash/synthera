"use client";

import { useEffect, useState } from "react";
import { Upload, FileText, CheckCircle2, Clock, Trash2, Plus, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

const PAGE_STYLE = {
    display: "flex", flexDirection: "column" as const, height: "100%",
    overflow: "hidden", backgroundColor: "#0a0a0a",
};
const HEADER_STYLE = {
    flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
};
const SCROLL_STYLE = {
    flex: 1, overflowY: "auto" as const, overflowX: "hidden" as const, minHeight: 0, padding: "28px 32px",
};
const INNER_STYLE = { maxWidth: 900, margin: "0 auto" };

export default function DocumentsPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocs = async () => {
        try {
            const data = await api.get("/documents/list");
            setDocs(data);
        } catch {/* silent */ } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
        const t = setInterval(fetchDocs, 10000);
        return () => clearInterval(t);
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        e.target.value = "";
        setIsUploading(true);
        try { await api.upload("/documents/upload", file); await fetchDocs(); }
        finally { setIsUploading(false); }
    };

    return (
        <div style={PAGE_STYLE}>
            {/* Header */}
            <div style={HEADER_STYLE}>
                <div>
                    <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>Document Vault</p>
                    <p style={{ margin: "3px 0 0", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Managed Repository</p>
                </div>
                <label style={{ cursor: "pointer" }}>
                    <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={isUploading} />
                    <span style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "8px 18px", borderRadius: 10, cursor: isUploading ? "not-allowed" : "pointer",
                        backgroundColor: isUploading ? "rgba(255,255,255,0.1)" : "#ffffff",
                        color: isUploading ? "rgba(255,255,255,0.4)" : "#000",
                        fontSize: 12, fontWeight: 700,
                    }}>
                        {isUploading
                            ? <><div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Uploading…</>
                            : <><Plus size={14} />Upload PDF</>
                        }
                    </span>
                </label>
            </div>

            {/* Content */}
            <div style={SCROLL_STYLE}>
                <div style={INNER_STYLE}>
                    {isLoading ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: 160 }} />
                            ))}
                        </div>
                    ) : docs.length === 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, gap: 16, textAlign: "center" }}>
                            <div style={{ width: 64, height: 64, borderRadius: 16, border: "1.5px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Upload size={22} color="rgba(255,255,255,0.2)" />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>Vault is Empty</p>
                                <p style={{ margin: "8px 0 0", fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>Upload PDF documents to begin extraction and analysis.</p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                            {docs.map(doc => (
                                <DocCard key={doc.id} doc={doc} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DocCard({ doc }: { doc: any }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "20px", borderRadius: 14,
                backgroundColor: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.15s", cursor: "default",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={18} color="rgba(255,255,255,0.4)" />
                </div>
                <StatusBadge status={doc.status} />
            </div>
            <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.filename}</p>
            <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "monospace", textTransform: "uppercase" }}>ID: {String(doc.id).slice(0, 8)}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Clock size={11} color="rgba(255,255,255,0.2)" />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{new Date(doc.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "ready") return (
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
            <CheckCircle2 size={11} />Ready
        </div>
    );
    if (status === "processing") return (
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
            <Clock size={11} />Processing
        </div>
    );
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", fontSize: 10, fontWeight: 700, color: "rgba(239,68,68,0.7)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
            <AlertCircle size={11} />Error
        </div>
    );
}
