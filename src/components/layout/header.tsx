"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="font-headline text-xl font-semibold md:text-2xl">
        {title}
      </h1>
      {/* Add user menu or other actions here if needed */}
    </header>
  );
}
