"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MainNav } from "./main-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r border-sidebar-border">
        <MainNav />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
