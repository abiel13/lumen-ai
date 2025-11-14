"use client";
import React, { Suspense } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { MessageSquare, History as HistoryIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const HistoryContent = ({ user }: { user: any }) => {
  const searchParams = useSearchParams();
  const currentChat = searchParams.get("chat");

  // Safety check
  if (!user) {
    return (
      <div className="px-4 py-8 text-center">
        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">No user data</p>
      </div>
    );
  }

  return (
    <div className="px-3 py-2 flex-1 flex-shrink-0 h-full overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-3 px-4">
        <HistoryIcon className="w-4 h-4 text-gray-500" />
        <h2 className="text-sm font-semibold tracking-tight text-gray-700 uppercase">
          Chat History
        </h2>
      </div>
      <ScrollArea className="flex-1">
        {user?.history && Array.isArray(user.history) && user.history.length > 0 ? (
          <div className="px-2 py-2 gap-2 flex flex-col">
            {user.history.map((history: any, index: number) => {
              const isActive = currentChat === history?.conversationId;
              const preview = history?.messages?.[0]?.content?.substring(0, 50) || "New conversation";

              // Skip if no conversationId
              if (!history?.conversationId) {
                return null;
              }

              return (
                <Link
                  href={`/chat?chat=${history.conversationId}`}
                  key={history.conversationId || index}
                  className={`
                    group relative text-sm font-medium w-full rounded-lg px-3 py-2.5 transition-all
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-500"}`} />
                    <span className="line-clamp-2 break-words">{preview}...</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No chat history yet</p>
            <p className="text-xs text-gray-400 mt-1">Start a new conversation to see it here</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

const History = ({ user }: { user: any }) => {
  return (
    <Suspense fallback={
      <div className="px-4 py-8 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Loading history...</p>
      </div>
    }>
      <HistoryContent user={user} />
    </Suspense>
  );
};

export default History;
