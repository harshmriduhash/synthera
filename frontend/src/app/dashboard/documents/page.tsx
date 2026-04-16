"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, CheckCircle2, Clock, Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";

export default function DocumentsPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchDocs = async () => {
        try {
            const data = await api.get("/documents/list");
            setDocs(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDocs();
        const interval = setInterval(fetchDocs, 5000); // Poll for processing status
        return () => clearInterval(interval);
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            await api.upload("/documents/upload", file);
            fetchDocs();
        } catch (err) {
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <h1 className="text-xl font-bold">Document Repository</h1>
                <div className="relative">
                    <Input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                    />
                    <Label htmlFor="file-upload">
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white cursor-pointer">
                            <span>
                                {isUploading ? "Uploading..." : <><Plus className="w-4 h-4 mr-2" /> Upload PDF</>}
                            </span>
                        </Button>
                    </Label>
                </div>
            </header>

            <ScrollArea className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    {docs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mb-6">
                                <Upload className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No documents yet</h3>
                            <p className="text-slate-400 mb-8">Upload your first financial report to start analyzing.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {docs.map((doc) => (
                                <Card key={doc.id} className="bg-white/5 border-white/10 p-6 hover:border-primary/50 transition-all group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        {doc.status === 'ready' ? (
                                            <div className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                                <CheckCircle2 className="w-3 h-3" /> Ready
                                            </div>
                                        ) : doc.status === 'processing' ? (
                                            <div className="flex items-center gap-1 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                                                <Clock className="w-3 h-3 animate-spin" /> Processing
                                            </div>
                                        ) : (
                                            <div className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-full">Error</div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold truncate mb-2">{doc.filename}</h3>
                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </span>
                                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 h-8 w-8 p-0">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

function Input({ ...props }: any) {
    return <input {...props} />
}

function Label({ children, ...props }: any) {
    return <label {...props}>{children}</label>
}
