"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Plane } from "lucide-react";
import { useMsgStore } from "@/store/message.store";
import { getpromptRes } from "@/lib/actions/gemini.actions";

const TextPromptContainer = () => {
  const [text, setText] = useState("");
  const { addmessages } = useMsgStore();

  async function messagePrompt() {
    addmessages({
      text: text,
      type: "sent",
    });

    try {
      const res = await getpromptRes(text);

      if (res) {
        addmessages({
          text: res,
          type: "recieved",
        });
      }
    } catch (error) {
    } finally {
      setText("");
    }
  }

  return (
    <div className="w-[55%] mx-auto  flex flex-col gap-4 items-center justify-center py-3 bg-[#fafafa]  shadow-md rounded-lg px-2">
      <div className="flex-row w-full items-center flex gap-4">
        <Input
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          className="w-[100%] py-6"
          placeholder="Write a prompt .."
        />
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-slate-400">
          <Plane onClick={messagePrompt} color="white" />
        </div>
      </div>

      <div className="px-6 py-2 rounded-3xl self-start bg-slate-400 text-white font-medium">
        Generate Image
      </div>
    </div>
  );
};

export default TextPromptContainer;
