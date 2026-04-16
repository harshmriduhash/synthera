"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Bell, Info } from "lucide-react";

export default function FeedPage() {
    const items = [
        { title: "Anomaly Detected", desc: "Unusual spending pattern detected in Q3 Financial Report.", type: "anomaly", time: "2h ago" },
        { title: "New Trend", desc: "Operating margin shows a 15% upward trend over the last 3 documents.", type: "trend", time: "5h ago" },
        { title: "Document Processed", desc: "Standard Charter Annual Report 2025 has been indexed.", type: "event", time: "1d ago" },
    ];

    return (
        <div className="flex flex-col h-full">
            <header className="px-8 py-6 border-b border-white/5">
                <h1 className="text-xl font-bold">Intelligence Feed</h1>
            </header>

            <ScrollArea className="flex-1 p-8">
                <div className="max-w-4xl mx-auto space-y-4">
                    {items.map((item, i) => (
                        <Card key={i} className="bg-white/5 border-white/10 p-6 flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${item.type === 'anomaly' ? 'bg-red-500/10 text-red-500' :
                                    item.type === 'trend' ? 'bg-blue-500/10 text-blue-500' :
                                        'bg-green-500/10 text-green-500'
                                }`}>
                                {item.type === 'anomaly' ? <Activity className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <span className="text-xs text-slate-500">{item.time}</span>
                                </div>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
