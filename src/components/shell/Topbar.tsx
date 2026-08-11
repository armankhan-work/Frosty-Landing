"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Search, Command } from "lucide-react";
import { MerchantSwitcher } from "./MerchantSwitcher";
import { UserMenu } from "./UserMenu";
import type { Me } from "@/lib/types";

type Props = {
  me: Me;
  unread: number;
  openCommandPalette: () => void;
  onboardingMode?: boolean;
  title?: string;
};

export function Topbar({ me, unread, openCommandPalette, onboardingMode, title: customTitle }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const paths = (pathname || "").split("/").filter(Boolean);
  const displayPaths = paths.length === 1 && paths[0] === "home" ? [] : paths;

  const formatSegment = (seg: string) => {
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(seg)) {
      return customTitle || "Agent";
    }
    return seg.charAt(0).toUpperCase() + seg.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-[var(--line)] bg-[var(--canvas)]/80 backdrop-blur-md px-4 sm:px-6 gap-4">
      {/* Left section: Breadcrumbs */}
      <div className="flex flex-1 items-center min-w-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium font-sans truncate">
          {onboardingMode ? (
            <span className="hidden sm:inline text-muted-foreground/60 cursor-default shrink-0">
              Onboarding
            </span>
          ) : (
            <Link href="/home" className="hidden sm:inline text-muted-foreground/60 transition-colors hover:text-foreground hover:underline cursor-pointer shrink-0">
              Workspace
            </Link>
          )}
          {displayPaths.map((p, idx) => {
            const isLast = idx === displayPaths.length - 1;
            const label = isLast && customTitle ? customTitle : formatSegment(p);
            const href = "/" + paths.slice(0, idx + 1).join("/");
            return (
              <div key={idx} className="flex items-center gap-2 truncate">
                <span className="text-muted-foreground/30 font-light shrink-0">/</span>
                {isLast ? (
                  <span className="capitalize truncate text-foreground/90 font-semibold">
                    {label}
                  </span>
                ) : (
                  <Link href={href} className="capitalize truncate text-muted-foreground/60 hidden sm:inline transition-colors hover:text-foreground hover:underline cursor-pointer">
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Center section: Search Bar */}
      {!onboardingMode && (
        <div className="hidden md:flex items-center justify-center w-[260px] lg:w-[320px] shrink-0">
          <button
            onClick={openCommandPalette}
            className="flex w-full items-center gap-2.5 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1.5 text-[13px] text-muted-foreground/80 shadow-sm hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary backdrop-blur-md group"
          >
            <Search className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-foreground/80 transition-colors shrink-0" />
            <span className="flex-1 text-left font-normal truncate">Search...</span>
            <kbd className="hidden lg:inline-flex h-[18px] items-center gap-0.5 rounded-[4px] border border-black/10 dark:border-white/10 bg-card px-1 font-sans text-[9px] font-medium text-muted-foreground/80 group-hover:bg-card transition-colors shrink-0">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </kbd>
          </button>
        </div>
      )}

      {/* Right section: Actions */}
      {!onboardingMode && (
        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2 min-w-0">
          {/* Mobile Search Button */}
          <button
            onClick={openCommandPalette}
            className="md:hidden relative inline-flex shrink-0 items-center justify-center w-8 h-8 rounded-full text-muted-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-all duration-200"
            aria-label="Search"
          >
            <Search className="w-[17px] h-[17px]" />
          </button>

          <MerchantSwitcher me={me} />

          <button
            onClick={() => router.push("/notifications")}
            className="relative inline-flex shrink-0 items-center justify-center w-8 h-8 rounded-full text-muted-foreground/70 hover:bg-white/5 hover:text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
          >
            <Bell className="w-[17px] h-[17px]" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            )}
          </button>

          <div className="shrink-0">
            <UserMenu me={me} />
          </div>
        </div>
      )}
    </header>
  );
}
