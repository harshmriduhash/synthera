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
                            card: "bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl shadow-white/5",
                            headerTitle: "text-white text-2xl font-bold tracking-tight opacity-100",
                            headerSubtitle: "text-white/70",
                            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors",
                            formButtonPrimary: "bg-white text-black hover:bg-white/90 font-bold transition-all",
                            dividerLine: "bg-white/10",
                            dividerText: "text-white/50 font-medium",
                            formFieldLabel: "text-white/90 font-medium",
                            formFieldInput: "bg-white/5 border-white/20 text-white focus:border-white/40 transition-all",
                            footer: "bg-[#1a1a1a] border-t border-white/5",
                            footerActionText: "text-white/70",
                            footerActionLink: "text-white font-bold hover:text-white/80 transition-colors",
                            identityPreviewText: "text-white",
                            identityPreviewEditButton: "text-white/60 hover:text-white",
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
