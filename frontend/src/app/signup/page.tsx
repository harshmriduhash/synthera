"use client";

import { SignUp } from "@clerk/nextjs";

const S = {
    page: {
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#080808", padding: "20px", position: "relative" as const, overflow: "hidden"
    },
    glow: {
        position: "absolute" as const, top: "20%", left: "50%", width: "600px", height: "600px",
        background: "rgba(255,255,255,0.03)", borderRadius: "50%", filter: "blur(120px)", transform: "translate(-50%, -50%)", pointerEvents: "none" as const
    },
    container: { position: "relative" as const, zIndex: 1 }
};

export default function SignupPage() {
    return (
        <div style={S.page}>
            <div style={S.glow} />
            <div style={S.container}>
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "font-sans",
                            card: "bg-[#121212] border border-white/10 rounded-2xl shadow-2xl shadow-white/5",
                            headerTitle: "text-white text-2xl font-bold tracking-tight",
                            headerSubtitle: "text-white/60",
                            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors",
                            formButtonPrimary: "bg-white text-black hover:bg-white/90 font-bold transition-all",
                            dividerLine: "bg-white/10",
                            dividerText: "text-white/40 font-medium",
                            formFieldLabel: "text-white/80 font-medium",
                            formFieldInput: "bg-white/5 border-white/10 text-white focus:border-white/30 transition-all",
                            footerActionText: "text-white/60",
                            footerActionLink: "text-white font-semibold hover:text-white/80 transition-colors",
                            footer: "bg-transparent", // Ensure footer is transparent to inherit card bg
                        }
                    }}
                    signInUrl="/login"
                    routing="path"
                    path="/signup"
                />
            </div>
        </div>
    );
}
