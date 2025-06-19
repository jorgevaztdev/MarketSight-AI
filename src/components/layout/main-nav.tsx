
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, APP_TITLE, APP_LOGO_ICON } from "@/config/nav";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-3 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <APP_LOGO_ICON className="h-7 w-7 text-primary shrink-0" />
          {state === 'expanded' && (
             <h1 className="font-headline text-xl font-semibold text-primary truncate">
              {APP_TITLE}
            </h1>
          )}
        </Link>
        <div className="md:hidden">
           <SidebarTrigger/>
        </div>
      </SidebarHeader>

      <SidebarMenu className="flex-1 p-2">
        {NAV_ITEMS.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={{ children: item.title, className: "text-xs" }}
                className={cn(
                  "justify-start",
                  state === "collapsed" && "justify-center"
                )}
              >
                <item.icon className="shrink-0" />
                <span className={cn(state === "collapsed" ? "sr-only" : "")}>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
