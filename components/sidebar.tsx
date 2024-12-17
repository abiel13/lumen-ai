"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import Library from "./library";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import useUpdateParams from "@/lib/hooks/updateSearchParams";
import { useMsgStore } from "@/store/message.store";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  user:any
}

export function Sidebar({ className, user }: SidebarProps) {
  const updateParams = useUpdateParams();
  const { clearMsg } = useMsgStore();

  const handleNewChat = () => {
    updateParams("chat", "");
    clearMsg();
  };

  return (
    <div
      className={cn(
        "pb-12 border-r-[1px] border-r-gray-300 h-screen bottom-0 w-[20%]  flex flex-col sticky top-0 left-0",
        className
      )}
    >
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Lumen:ai
          </h2>
          <div className="space-y-1">
            <Button onClick={handleNewChat} variant="ghost" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              New Chat
            </Button>
          </div>
        </div>
        <Library user={user} />
      </div>
      <div className="px-4 my-auto flex-1 flex-grow-0">
        <SignOutButton>
          <div className="flex cursor-pointer gap-4 items-center bg-sidebar-inactive rounded-xl py-4 px-3">
            <LogOut />
            <p className="text-light-2 max-lg-hidden">Logout</p>
          </div>
        </SignOutButton>
      </div>
    </div>
  );
}
