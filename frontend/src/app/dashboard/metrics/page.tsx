"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, TrendingUp, ShieldAlert, Cpu } from "lucide-react";

export default function MetricsPage() {
    const metrics = [
        { label: "Avg. Latency", value: "2.4s", icon: Cpu, color: "text-blue-500" },
        { label: "Accuracy Rate", value: "98.2%", icon: TrendingUp, color: "text-green-500" },
        { label: "Hallucination Detected", value: "0.1%", icon: ShieldAlert, color: "text-red-500" },
        { label: "Total Queries", value: "1,284", icon: BarChart3, color: "text-primary" },
    ];

    return (
        <div className="flex flex-col h-full">
            <header className="px-8 py-6 border-b border-white/5">
                <h1 className="text-xl font-bold">Eval & Performance Dashboard</h1>
            </header>

            <ScrollArea className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {metrics.map((m, i) => (
                            <Card key={i} className="bg-white/5 border-white/10 p-6 flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">{m.label}</span>
                                    <m.icon className={`w-5 h-5 ${m.color}`} />
                                </div>
                                <div className="text-3xl font-bold">{m.value}</div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-white/5 border-white/10 p-8 h-80 flex flex-col items-center justify-center text-center">
                            <div className="text-slate-500 mb-4 italic">Query Latency Trend (Last 7 Days)</div>
                            <div className="flex items-end gap-2 h-32 w-full max-w-sm px-4">
                                {[40, 60, 45, 90, 30, 70, 50].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 rounded-t-lg transition-all hover:bg-primary" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="flex justify-between w-full max-w-sm text-[10px] text-slate-600 mt-4 uppercase">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </Card>

                        <Card className="bg-white/5 border-white/10 p-8 h-80">
                            <h3 className="text-sm font-bold uppercase text-slate-500 mb-6">Agentic Distribution</h3>
                            <div className="space-y-6">
                                {[
                                    { name: "Retriever", value: 95 },
                                    { name: "Extractor", value: 88 },
                                    { name: "Reasoner", value: 92 },
                                    { name: "Validator", value: 99 }
                                ].map((a, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-2">
                                            <span>{a.name} Agent Accuracy</span>
                                            <span className="font-bold">{a.value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${a.value}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
