"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const S = {
    page: {
        minHeight: "100vh", display: "flex", alignItems: "center", justifyCenter: "center",
        backgroundColor: "#080808", padding: "20px", position: "relative" as const, overflow: "hidden"
    },
    glow: {
        position: "absolute" as const, top: "20%", left: "50%", width: "600px", height: "600px",
        background: "rgba(255,255,255,0.03)", borderRadius: "50%", filter: "blur(120px)", transform: "translate(-50%, -50%)", pointerEvents: "none" as const
    },
    card: {
        width: "100%", maxWidth: "420px", margin: "0 auto", padding: "40px", borderRadius: "24px",
        backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)", position: "relative" as const, zIndex: 1
    },
    logo: {
        width: 48, height: 48, backgroundColor: "#fff", borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 24, color: "#000", margin: "0 auto 24px"
    },
    title: { fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.9)", textAlign: "center" as const, margin: "0 0 8px" },
    sub: { fontSize: 14, color: "rgba(255,255,255,0.35)", textAlign: "center" as const, margin: "0 0 32px" },
    form: { display: "flex", flexDirection: "column" as const, gap: 20 },
    field: { display: "flex", flexDirection: "column" as const, gap: 8 },
    label: { fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)" },
    input: {
        width: "100%", padding: "12px 16px", borderRadius: 12, backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none"
    },
    btn: {
        width: "100%", padding: "14px", borderRadius: 12, backgroundColor: "#fff",
        color: "#000", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
        marginTop: 12, transition: "opacity 0.2s"
    },
    footer: { marginTop: 24, textAlign: "center" as const, fontSize: 14, color: "rgba(255,255,255,0.3)" },
    link: { color: "#fff", textDecoration: "none", fontWeight: 600 }
};

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/dashboard");
    };

    return (
        <div style={S.page}>
            <div style={S.glow} />
            <div style={{ ...S.card, display: "block" }}>
                <div style={S.logo}>S</div>
                <h1 style={S.title}>Create an account</h1>
                <p style={S.sub}>Enter your details to start using Synthera AI</p>

                <form onSubmit={handleSignup} style={S.form}>
                    <div style={S.field}>
                        <label style={S.label}>Full Name</label>
                        <input
                            placeholder="John Doe"
                            style={S.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div style={S.field}>
                        <label style={S.label}>Email</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            style={S.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={S.field}>
                        <label style={S.label}>Password</label>
                        <input
                            type="password"
                            style={S.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={S.btn} onMouseEnter={e => e.currentTarget.style.opacity = "0.9"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                        Get Started
                    </button>
                </form>

                <div style={S.footer}>
                    Already have an account?{" "}
                    <Link href="/login" style={S.link}>Sign in</Link>
                </div>
            </div>
        </div>
    );
}
