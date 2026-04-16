"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send, User, Bot, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function ChatPage() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMessage = { role: "user", content: query };
        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
        setIsLoading(true);

        try {
            const res = await api.post("/chat/query", { query });
            const botMessage = {
                role: "bot",
                content: res.answer,
                reasoning: res.reasoning,
                validation: res.validation,
                sources: res.sources
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { role: "error", content: "Failed to get response from Synthera." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <h1 className="text-xl font-bold">Intelligent Analyst</h1>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Agentic Reasoning Active
                </div>
            </header>

            <ScrollArea className="flex-1 p-8">
                <div className="max-w-4xl mx-auto space-y-8 pb-12">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                <Bot className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Welcome to Synthera Intelligence</h2>
                            <p className="text-slate-400 max-w-sm">Ask anything about your financial documents or get a strategic decision recommendations.</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl p-6 ${msg.role === 'user'
                                ? 'bg-primary text-white'
                                : msg.role === 'error'
                                    ? 'bg-red-500/10 border border-red-500/20 text-red-500'
                                    : 'bg-white/5 border border-white/10'
                                }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                                        {msg.role === 'user' ? 'You' : 'Synthera AI'}
                                    </span>
                                </div>
                                <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                                    {msg.content}
                                </div>

                                {msg.reasoning && (
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <h4 className="text-xs font-bold text-primary uppercase mb-3">Reasoning Agent</h4>
                                        <p className="text-sm text-slate-400 italic mb-4">{msg.reasoning}</p>

                                        {msg.sources && msg.sources.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-slate-500 uppercase">Sources</h4>
                                                {msg.sources.map((s: any, j: number) => (
                                                    <div key={j} className="text-xs p-3 bg-white/5 rounded-lg border border-white/5">
                                                        <span className="text-primary font-bold">Page {s.page}:</span> {s.snippet}...
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
                                <div className="flex items-center gap-2 mb-4">
                                    <Bot className="w-4 h-4" />
                                    <div className="h-2 w-24 bg-slate-700 rounded"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-64 bg-slate-700 rounded"></div>
                                    <div className="h-2 w-48 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="p-8 border-t border-white/5 pb-12">
                <div className="max-w-4xl mx-auto relative flex gap-4">
                    <div className="relative flex-1">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your query or strategic question..."
                            className="h-14 bg-white/5 border-white/10 rounded-xl pl-6 pr-16 focus:ring-primary/50"
                        />
                        <Button
                            onClick={handleSend}
                            disabled={isLoading || !query.trim()}
                            className="absolute right-2 top-2 h-10 w-10 p-0 bg-primary hover:bg-primary/90 text-white rounded-lg"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                    <VoiceInput onTranscribe={(text) => setQuery(text)} />
                </div>
                <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em]">
                    Explainable AI · multi-agent reasoning · production grade
                </p>
            </div>
        </div>
    );
}

function VoiceInput({ onTranscribe }: { onTranscribe: (text: string) => void }) {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'audio/m4a' });
                const file = new File([blob], 'voice.m4a', { type: 'audio/m4a' });

                try {
                    const res = await api.upload("/voice/transcribe", file);
                    if (res.text) onTranscribe(res.text);
                } catch (err) {
                    console.error("Transcription failed", err);
                }
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone access denied", err);
        }
    };

    const stopRecording = () => {
        mediaRecorder?.stop();
        setIsRecording(false);
    };

    return (
        <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "outline"}
            className={`h-14 w-14 rounded-xl border-white/10 ${isRecording ? 'animate-pulse' : 'bg-white/5 hover:bg-white/10'}`}
        >
            <Mic className={isRecording ? "animate-bounce" : ""} />
        </Button>
    );
}

import { Mic } from "lucide-react";
