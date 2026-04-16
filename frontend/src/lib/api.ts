const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
    async post(path: string, data: any) {
        const res = await fetch(`${API_BASE}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    async upload(path: string, file: File) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${API_BASE}${path}`, {
            method: "POST",
            body: formData,
        });
        return res.json();
    },

    async get(path: string) {
        const res = await fetch(`${API_BASE}${path}`);
        return res.json();
    },
};
