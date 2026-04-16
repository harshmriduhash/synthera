"use client";

import { Card } from "@/components/ui/card";
import { Database, Share2 } from "lucide-react";

export default function GraphPage() {
    return (
        <div className="flex flex-col h-full">
            <header className="px-8 py-6 border-b border-white/5">
                <h1 className="text-xl font-bold">Knowledge Graph</h1>
            </header>

            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="max-w-md text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                        <Share2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Relational Memory</h2>
                    <p className="text-slate-400 mb-8">
                        Synthera is building a knowledge graph of entities and relations across your documents.
                        Full visualization is coming in Phase 2.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-white/5 border-white/10 p-4">
                            <div className="text-2xl font-bold text-primary">124</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Entities</div>
                        </Card>
                        <Card className="bg-white/5 border-white/10 p-4">
                            <div className="text-2xl font-bold text-primary">48</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Relations</div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
