import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "100vh", overflow: "hidden" }}>
            <DashboardSidebar />
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
                {children}
            </div>
        </div>
    );
}
