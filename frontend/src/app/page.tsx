import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white">S</div>
          <span className="text-xl font-bold tracking-tight">SYNTHERA AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#security" className="hover:text-white transition-colors">Security</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-slate-400 hover:text-white">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6">Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <section className="relative px-8 pt-24 pb-32 flex flex-col items-center text-center overflow-hidden">
          {/* Ambient Background Gradient */}
          <div className="absolute top-0 -z-10 h-full w-full bg-[#0B0F1A]">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(31,111,235,0.1)] opacity-50 blur-[80px]"></div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen AI Analyst
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-8 leading-[1.1]">
            Stop Reading 100-Page Reports. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Start Getting Answers.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mb-12">
            Synthera AI is an AI-native intelligence platform that converts unstructured financial data into structured, explainable insights in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-lg">
                Try Synthera Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 h-14 px-8 text-lg">
              Book a Demo
            </Button>
          </div>

          <div className="mt-24 w-full max-w-5xl rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-4 shadow-2xl">
            {/* Product Mockup Placeholder */}
            <div className="aspect-[16/9] w-full rounded-lg bg-[#0B1221] flex items-center justify-center border border-white/5">
              <div className="text-slate-500 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-slate-700 animate-pulse mb-4"></div>
                <div className="h-4 w-48 bg-slate-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-8 py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Intelligence</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Built for analysts, founders, and consultants who need clarity in a sea of noise.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Document Intelligence", desc: "Automated parsing and extraction from complex PDFs and financial reports." },
                { title: "Decision Engine", desc: "AI-driven recommendations based on multi-signal analysis and market trends." },
                { title: "Explainability Layer", desc: "Every insight is backed by source document citations and snippets." }
              ].map((f, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    {i === 0 ? "📄" : i === 1 ? "⚙️" : "🔍"}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-bold text-xs text-white">S</div>
            <span className="font-bold">SYNTHERA AI</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Synthera AI. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
