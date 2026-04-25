import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function LandingPage() {
  const { userId } = await auth();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#080808", color: "#fff", fontFamily: "inherit" }}>
      {/* Nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(8,8,8,0.85)", backdropFilter: "blur(14px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, backgroundColor: "#fff", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#000", flexShrink: 0 }}>S</div>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.82)" }}>SYNTHERA</span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="#features" style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.38)", textDecoration: "none", letterSpacing: "0.05em" }}>Features</Link>
            <Link href="#security" style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.38)", textDecoration: "none", letterSpacing: "0.05em" }}>Security</Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {!userId ? (
              <>
                <Link href="/login" style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>Login</Link>
                <Link href="/dashboard" style={{ display: "inline-block", padding: "8px 20px", backgroundColor: "#fff", color: "#000", fontWeight: 700, fontSize: 12, borderRadius: 9, textDecoration: "none", letterSpacing: "0.04em" }}>
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>Dashboard</Link>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section style={{ padding: "90px 32px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Ambient */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 500, background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.09)", backgroundColor: "rgba(255,255,255,0.04)", marginBottom: 36 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.5)", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.42)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Strategic Protocol v1.0</span>
            </div>

            <h1 style={{ margin: "0 0 24px", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.92)" }}>
              Autonomous Intelligence<br />
              <span style={{ color: "rgba(255,255,255,0.32)" }}>for Global Finance.</span>
            </h1>

            <p style={{ margin: "0 auto 40px", maxWidth: 520, fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
              Deploy multi-agent reasoning across your document vault to extract crystalline strategic signals in seconds.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", backgroundColor: "#fff", color: "#000", fontWeight: 700, fontSize: 13, borderRadius: 12, textDecoration: "none", letterSpacing: "0.04em" }}>
                Initiate Session →
              </Link>
              <Link href="/dashboard/documents" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", backgroundColor: "transparent", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: 13, borderRadius: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", letterSpacing: "0.04em" }}>
                View Documentation
              </Link>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div style={{ position: "relative", maxWidth: 960, margin: "72px auto 0", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#060606", padding: 12, boxShadow: "0 60px 120px rgba(0,0,0,0.6)" }}>
            <div style={{ aspectRatio: "16/9", borderRadius: 12, backgroundColor: "#030303", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {/* Mini dashboard preview */}
              <div style={{ display: "flex", width: "100%", height: "100%", position: "absolute", inset: 0 }}>
                {/* Sidebar stub */}
                <div style={{ width: "20%", backgroundColor: "#080808", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ height: 28, borderRadius: 6, backgroundColor: i === 0 ? "rgba(255,255,255,0.07)" : "transparent" }} />
                  ))}
                </div>
                {/* Content stub */}
                <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                    {[...Array(4)].map((_, i) => <div key={i} style={{ height: 54, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }} />)}
                  </div>
                  <div style={{ flex: 1, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" style={{ padding: "80px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>Capabilities</p>
              <h2 style={{ margin: 0, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "rgba(255,255,255,0.82)", letterSpacing: "-0.02em" }}>Enterprise-Grade Intelligence</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
              {[
                { title: "Node Extraction", desc: "Automated entity and relationship mapping from complex corporate documents and financial reports." },
                { title: "Strategy Pulse", desc: "AI-driven decision benchmarks based on cross-correlated financial signals and market patterns." },
                { title: "Vault Security", desc: "End-to-end encrypted reasoning nodes with complete data isolation and audit trails." },
              ].map(({ title, desc }) => (
                <div key={title} style={{ padding: "28px", borderRadius: 14, backgroundColor: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.35)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "36px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff" }}>S</div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Synthera AI</span>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.22)" }}>© 2026 Synthera AI. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>Privacy</Link>
            <Link href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
