"use client";

import { SignIn } from "@clerk/nextjs";

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

export default function LoginPage() {
    return (
        <div style={S.page}>
            <div style={S.glow} />
            <div style={S.container}>
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "font-sans",
                            card: "bg-[#0a0a0a] border border-white/10 rounded-2xl",
                            headerTitle: "text-white text-2xl font-bold",
                            headerSubtitle: "text-white/40",
                            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                            formButtonPrimary: "bg-white text-black hover:bg-white/90 font-bold",
                            dividerLine: "bg-white/10",
                            dividerText: "text-white/30",
                            formFieldLabel: "text-white/60",
                            formFieldInput: "bg-white/5 border-white/10 text-white",
                            footerActionText: "text-white/40",
                            footerActionLink: "text-white hover:text-white/80",
                        }
                    }}
                    signUpUrl="/signup"
                    routing="path"
                    path="/login"
                />
            </div>
        </div>
    );
}
