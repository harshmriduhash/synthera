import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Synthera AI | Intelligent Financial Analysis",
  description: "Next-gen AI platform for unstructured financial data extraction and reasoning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} h-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))]`}>
          {children}
          <Toaster position="bottom-right" theme="dark" closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
