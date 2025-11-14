"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useMsgStore } from "@/store/message.store";
import { useSearchParams } from "next/navigation";
import { getHistoryById } from "@/lib/actions/history.actions";
import { formatTextRes } from "@/lib/utils";
import { User, Sparkles } from "lucide-react";

const MessageBox = () => {
  const { messages, setMsg, clearMsg } = useMsgStore();
  const searchParams = useSearchParams();
  const [urlparams, setUrlParams] = useState<string | null>(null);

  useEffect(() => {
    const chatParam = searchParams.get("chat");
    setUrlParams(chatParam);

    // Clear messages if no chat parameter
    if (!chatParam) {
      clearMsg();
    }
  }, [searchParams, clearMsg]);

  useEffect(() => {
    (async function fetchMessages() {
      if (!urlparams) {
        clearMsg();
        return;
      }

      try {
        const res: any = await getHistoryById(urlparams);
        if (res?.messages) {
          setMsg(res.messages);
        } else {
          clearMsg();
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        clearMsg();
      }
    })();
  }, [urlparams, setMsg, clearMsg]);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <ScrollArea className="w-full h-full flex flex-col pt-8 px-4">
      {messages.length > 0 ? (
        <div className="flex flex-col w-full gap-6 pb-8">
          {messages.map((message, index) => {
            const formattedContent = `<p> ${formatTextRes(
              message?.content || ""
            )} </p>`;
            const isUser = message?.path === "sent";

            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600"
                  : "bg-gradient-to-br from-purple-500 to-pink-500"
                  }`}>
                  {isUser ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`px-5 py-3 rounded-2xl max-w-[70%] shadow-sm ${isUser
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none"
                    : "bg-white border border-gray-200 text-gray-900 rounded-tl-none"
                    }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formattedContent,
                    }}
                    className={`flex flex-col gap-2 prose prose-sm max-w-none ${isUser ? "prose-invert" : ""
                      }`}
                    style={{
                      color: isUser ? "white" : "inherit",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="my-24 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h4 className="font-bold text-gray-700 text-4xl mb-2">
            How can I help you today?
          </h4>
          <p className="text-gray-500 text-lg">
            Ask me anything, and I'll do my best to assist you.
          </p>
        </div>
      )}
    </ScrollArea>
  );
};

export default MessageBox;
