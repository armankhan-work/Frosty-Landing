"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { signOut } from "@/lib/session";
import { useRouter } from "next/navigation";
import type { Me } from "@/lib/types";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export function UserMenu({ me }: { me: Me }) {
  const router = useRouter();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const name = me.display_name || me.email || "You";
  const initial = name.charAt(0).toUpperCase();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-foreground font-semibold text-[13px] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm backdrop-blur-md">
            {initial}
          </button>
        </DropdownMenu.Trigger>
        
        <DropdownMenu.Portal>
          <DropdownMenu.Content 
            className="z-50 min-w-[220px] overflow-hidden rounded-xl border border-[#E8E3F4] bg-white p-1.5 shadow-2xl animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2"
            align="end"
            sideOffset={8}
          >
            <div className="flex flex-col space-y-1 p-2 pb-3 border-b border-[#E8E3F4] mb-1">
              <p className="text-sm font-semibold leading-none text-[#111318]">{name}</p>
              <p className="text-xs font-medium leading-none text-[#6B6970] mt-1 truncate">{me.email}</p>
            </div>
            
            <DropdownMenu.Item 
              onClick={() => router.push("/settings")}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-2 text-sm font-medium text-[#111318] outline-none transition-colors hover:bg-[#F0EAFF] hover:text-[#5F23C8] focus:bg-[#F0EAFF] focus:text-[#5F23C8] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <Settings className="mr-2.5 h-4 w-4 text-[#6B6970]" />
              <span>Settings</span>
            </DropdownMenu.Item>
            
            <DropdownMenu.Separator className="h-px bg-[#E8E3F4] my-1" />
            
            <DropdownMenu.Item 
              onSelect={(e) => {
                e.preventDefault();
                setShowConfirmLogout(true);
              }}
              className="relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-2 text-sm font-medium outline-none transition-colors hover:bg-red-50 text-red-600 focus:bg-red-50 focus:text-red-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <LogOut className="mr-2.5 h-4 w-4 text-red-500" />
              <span>Log out</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <ConfirmModal
        show={showConfirmLogout}
        icon={<LogOut size={20} />}
        tone="primary"
        title="Log Out"
        message="Are you sure you want to log out of your merchant workspace?"
        confirmText="Log Out"
        cancelText="Cancel"
        onConfirm={async () => {
          setShowConfirmLogout(false);
          await signOut();
          router.replace("/login");
        }}
        onCancel={() => setShowConfirmLogout(false)}
      />
    </>
  );
}
