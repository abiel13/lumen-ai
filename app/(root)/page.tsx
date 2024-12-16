'use client'
import TextPromptContainer from "@/components/TextPromptContainer";
import Navbar from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMsgStore } from "@/store/message.store";
import React from "react";

const ChatPage =  () => {
  const {messages} = useMsgStore();

  return (
    <div className="px-8 overflow-y-hidden relative  h-screen">
      <Navbar />
      <ScrollArea className="w-full h-[75%] flex flex-col pt-8 px-4">
        {messages.length > 0 ? (
          <div className="flex flex-col w-full">
            {
              messages.map((message, index) => {
                return  (
                  <div className={`${message.type === 'sent' ? 'self-end bg-slate-300 ' : 'self-start bg-slate-200'} px-8 py-2 rounded-2xl w-fit max-w-[50%]`}>
                    {message.text}
                  </div>
                )
              })
            }
          </div>
        ) : (
          <div className="my-24 flex items-center justify-center">
            <h4 className="font-bold text-gray-500 text-5xl">
              What can i help With?
            </h4>
          </div>
        )}
      </ScrollArea>

      <TextPromptContainer />
    </div>
  );
};

export default ChatPage;
