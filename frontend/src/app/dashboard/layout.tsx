import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden bg-[#0B0F1A]">
                <DashboardSidebar />
                <SidebarInset className="flex-1 flex flex-col bg-[#0B0F1A] border-l border-white/5">
                    {children}
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
