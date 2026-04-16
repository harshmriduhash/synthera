"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Share2, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

export default function GraphPage() {
    const [entities, setEntities] = useState<any[]>([]);
    const [relations, setRelations] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const entRes = await api.get("/documents/entities");
                const relRes = await api.get("/documents/relations");
                setEntities(entRes);
                setRelations(relRes);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col h-full">
            <header className="px-8 py-6 border-b border-white/5">
                <h1 className="text-xl font-bold">Knowledge Graph</h1>
            </header>

            <ScrollArea className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <Card className="bg-white/5 border-white/10 p-6">
                            <div className="text-3xl font-bold text-primary mb-1">{entities.length}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Total Entities Extracted</div>
                        </Card>
                        <Card className="bg-white/5 border-white/10 p-6">
                            <div className="text-3xl font-bold text-green-500 mb-1">{relations.length}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Identified Relationships</div>
                        </Card>
                        <Card className="bg-white/5 border-white/10 p-6">
                            <div className="text-3xl font-bold text-blue-500 mb-1">Agentic</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Processing Mode</div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase text-slate-500 tracking-widest mb-6">Extracted Entities</h2>
                            {entities.length === 0 ? (
                                <p className="text-slate-500 text-sm">No entities extracted yet. Upload a document to start.</p>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {entities.map((ent, i) => (
                                        <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group hover:border-primary/50 transition-colors">
                                            <span className="text-sm font-medium">{ent.name}</span>
                                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{ent.type}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase text-slate-500 tracking-widest mb-6">Knowledge Relations</h2>
                            {relations.length === 0 ? (
                                <p className="text-slate-500 text-sm">No relations identified yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {relations.map((rel, i) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-4 text-sm group hover:bg-white/[0.07] transition-colors">
                                            <span className="font-bold text-primary">{rel.subject}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
                                            <span className="text-slate-400 italic">{rel.relation}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
                                            <span className="font-bold text-green-500">{rel.object}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
