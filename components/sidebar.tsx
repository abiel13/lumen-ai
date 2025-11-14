"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import Library from "./library";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, Plus, Sparkles } from "lucide-react";
import useUpdateParams from "@/lib/hooks/updateSearchParams";
import { useMsgStore } from "@/store/message.store";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: any
}

export function Sidebar({ className, user }: SidebarProps) {
  const updateParams = useUpdateParams();
  const { clearMsg } = useMsgStore();

  const handleNewChat = () => {
    updateParams("chat", "");
    clearMsg();
  };

  // Safety check for user data
  if (!user) {
    return null;
  }

  return (
    <div
      className={cn(
        "pb-12 border-r border-gray-200 bg-white/80 backdrop-blur-md h-screen bottom-0 w-[280px] flex flex-col sticky top-0 left-0 shadow-sm",
        className
      )}
    >
      <div className="space-y-4 py-4 flex-1 overflow-hidden flex flex-col">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-4 px-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Lumen AI
            </h2>
          </div>
          <div className="space-y-1">
            <Button
              onClick={handleNewChat}
              className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Library user={user} />
        </div>
      </div>
      <div className="px-4 pb-4 mt-auto">
        <SignOutButton>
          <Button
            variant="outline"
            className="w-full justify-start border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
}
