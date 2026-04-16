"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Sparkles, Mic } from "lucide-react";
import { api } from "@/lib/api";

type Message = { role: "user" | "bot" | "error"; content: string; reasoning?: string; sources?: any[] };

const S = {
    page: { display: "flex", flexDirection: "column" as const, height: "100%", overflow: "hidden", backgroundColor: "#0a0a0a" },
    header: {
        flexShrink: 0, padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
    },
    headerLeft: { display: "flex", flexDirection: "column" as const, gap: 4 },
    h1: { margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "-0.01em" },
    h1sub: { margin: 0, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" as const },
    badge: {
        display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.03)",
        fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" as const,
    },
    dot: { width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)", flexShrink: 0 },
    messages: { flex: 1, overflowY: "auto" as const, overflowX: "hidden" as const, minHeight: 0, padding: "32px 32px 16px" },
    inner: { maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column" as const, gap: 24 },
    emptyState: { display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", minHeight: 320, gap: 20, textAlign: "center" as const },
    emptyIcon: { width: 64, height: 64, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" },
    suggestions: { display: "flex", flexWrap: "wrap" as const, gap: 8, justifyContent: "center", marginTop: 8 },
    suggBtn: { padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600, cursor: "pointer" },
    msgRow: (isUser: boolean) => ({ display: "flex", gap: 12, flexDirection: isUser ? "row-reverse" as const : "row" as const, alignItems: "flex-start" }),
    avatar: (isUser: boolean) => ({
        width: 32, height: 32, borderRadius: 10, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: isUser ? "#fff" : "rgba(255,255,255,0.06)",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.1)",
    }),
    bubble: (role: string) => ({
        padding: "12px 18px", maxWidth: "80%",
        fontSize: 14, lineHeight: 1.65, color: role === "user" ? "#000" : "rgba(255,255,255,0.82)",
        backgroundColor: role === "user" ? "#ffffff" : role === "error" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)",
        border: role === "user" ? "none" : role === "error" ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        wordBreak: "break-word" as const,
    }),
    reasoning: {
        marginTop: 8, padding: "12px 16px", borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        maxWidth: "80%", marginLeft: 44,
    },
    thinkingBubble: {
        display: "flex", alignItems: "center", gap: 12, padding: "12px 18px",
        backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "18px 18px 18px 4px",
    },
    inputArea: {
        flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 32px 20px", backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)",
    },
    inputRow: { maxWidth: 720, margin: "0 auto", display: "flex", gap: 8, alignItems: "flex-end" },
    textarea: {
        flex: 1, minHeight: 46, maxHeight: 120, padding: "12px 16px", resize: "none" as const,
        backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 14, color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.5, outline: "none",
        fontFamily: "inherit",
    },
    sendBtn: (disabled: boolean) => ({
        width: 46, height: 46, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: disabled ? "rgba(255,255,255,0.1)" : "#ffffff",
        color: disabled ? "rgba(255,255,255,0.3)" : "#000",
        border: "none", cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.15s",
    }),
    micBtn: (active: boolean) => ({
        width: 46, height: 46, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)",
        border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.15s",
    }),
    footerText: { textAlign: "center" as const, fontSize: 10, color: "rgba(255,255,255,0.15)", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, marginTop: 10 },
};

export default function ChatPage() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

    const send = async () => {
        if (!query.trim() || isLoading) return;
        const q = query;
        setMessages(p => [...p, { role: "user", content: q }]);
        setQuery("");
        setIsLoading(true);
        try {
            const res = await api.post("/chat/query", { query: q });
            setMessages(p => [...p, { role: "bot", content: res.answer, reasoning: res.reasoning, sources: res.sources }]);
        } catch {
            setMessages(p => [...p, { role: "error", content: "Connection to reasoning layer failed. Please retry." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMic = async () => {
        if (isRecording && recorder) {
            recorder.stop();
            recorder.stream.getTracks().forEach(t => t.stop());
            setIsRecording(false);
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const rec = new MediaRecorder(stream);
            const chunks: Blob[] = [];
            rec.ondataavailable = e => chunks.push(e.data);
            rec.onstop = async () => {
                try {
                    const blob = new Blob(chunks, { type: "audio/m4a" });
                    const file = new File([blob], "voice.m4a", { type: "audio/m4a" });
                    const res = await api.upload("/voice/transcribe", file);
                    if (res.text) setQuery(prev => prev + res.text);
                } catch { /* silent */ }
            };
            rec.start();
            setRecorder(rec);
            setIsRecording(true);
        } catch { /* mic denied */ }
    };

    return (
        <div style={S.page}>
            {/* Header */}
            <div style={S.header}>
                <div style={S.headerLeft}>
                    <p style={S.h1}>Strategic Hub</p>
                    <p style={S.h1sub}>Multi-Agent Reasoning</p>
                </div>
                <div style={S.badge}>
                    <span style={S.dot} />
                    Online
                </div>
            </div>

            {/* Messages */}
            <div style={S.messages}>
                <div style={S.inner}>
                    {messages.length === 0 && !isLoading && (
                        <div style={S.emptyState}>
                            <div style={S.emptyIcon}><Sparkles size={26} color="rgba(255,255,255,0.28)" /></div>
                            <div>
                                <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.78)" }}>Ready for Analysis</p>
                                <p style={{ margin: "8px 0 0", fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
                                    Upload documents to the vault then ask anything about your financial data.
                                </p>
                            </div>
                            <div style={S.suggestions}>
                                {["Summarize key risks", "Extract KPIs", "Identify market trends"].map(s => (
                                    <button key={s} style={S.suggBtn} onClick={() => setQuery(s)}>{s}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i}>
                            <div style={S.msgRow(msg.role === "user")}>
                                <div style={S.avatar(msg.role === "user")}>
                                    {msg.role === "user"
                                        ? <User size={15} color="#000" />
                                        : <Bot size={15} color="rgba(255,255,255,0.5)" />
                                    }
                                </div>
                                <div style={S.bubble(msg.role)}>{msg.content}</div>
                            </div>
                            {msg.reasoning && (
                                <div style={S.reasoning}>
                                    <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Reasoning Trace</p>
                                    <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.4)", fontStyle: "italic", lineHeight: 1.65 }}>{msg.reasoning}</p>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                                            {msg.sources.map((s: any, j: number) => (
                                                <div key={j} style={{ padding: "10px 12px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                                    <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>Page {s.page}</p>
                                                    <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.25)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>{s.snippet}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div style={S.msgRow(false)}>
                            <div style={S.avatar(false)}><Bot size={15} color="rgba(255,255,255,0.5)" /></div>
                            <div style={S.thinkingBubble}>
                                <div style={{ display: "flex", gap: 4 }}>
                                    <span className="dot-pulse" />
                                    <span className="dot-pulse" />
                                    <span className="dot-pulse" />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Synthera is thinking</span>
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>
            </div>

            {/* Input */}
            <div style={S.inputArea}>
                <div style={S.inputRow}>
                    <textarea
                        style={S.textarea}
                        value={query}
                        rows={1}
                        placeholder="Ask Synthera anything about your documents…"
                        onChange={e => setQuery(e.target.value)}
                        onInput={e => {
                            const t = e.currentTarget;
                            t.style.height = "auto";
                            t.style.height = Math.min(t.scrollHeight, 120) + "px";
                        }}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                    />
                    <button style={S.micBtn(isRecording)} onClick={toggleMic}><Mic size={16} /></button>
                    <button style={S.sendBtn(!query.trim() || isLoading)} onClick={send} disabled={!query.trim() || isLoading}>
                        <Send size={16} />
                    </button>
                </div>
                <p style={S.footerText}>Encrypted · Explainable AI · Multi-Agent Synapse</p>
            </div>
        </div>
    );
}
