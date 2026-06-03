import type { ReactNode } from "react";

import HeaderLayout from "@/components/layout/HeaderLayout";

type AppLayoutProps = {
    children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <HeaderLayout />

            <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </div>
    );
}