"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Plane } from "lucide-react";
import { useMsgStore } from "@/store/message.store";
import { getpromptRes } from "@/lib/actions/gemini.actions";
import { genuid } from "@/lib/utils";
import useUpdateParams from "@/lib/hooks/updateSearchParams";
import useGetParam from "@/lib/hooks/useGetParams";
import {
  addMessageToHistory,
  createHistory,
} from "@/lib/actions/history.actions";
import { addHistoryToUser } from "@/lib/actions/user.action";
import { createMessage } from "@/lib/actions/message.actions";
import { toast } from "sonner";

const TextPromptContainer = ({ userid }: { userid: string }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { addmessages } = useMsgStore();
  const updateParams = useUpdateParams();
  const { hasParam, getParamValue } = useGetParam();

  async function createuserhistory() {
    const conversationid = genuid();
    updateParams("chat", conversationid);

    try {
      const history: any = await createHistory({
        conversationId: conversationid,
        messages: [],
      });
      const adduserhistory = await addHistoryToUser(userid, history._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function messagePrompt() {
    // create history and update url search params;
    if (!text.length) {
      return;
    }

    if (!hasParam("chat")) {
      await createuserhistory();
    }

    const conversationid = getParamValue("chat")!;

    try {
      setLoading(true);
      addmessages({
        text: text,
        type: "sent",
      });

      const message: any = await createMessage({
        type: "text",
        path: "sent",
        content: text,
      });
      if (message) {
        const added = await addMessageToHistory(conversationid, message._id);
      }
    } catch (error) {
      toast("an error occured while sending message");
    }

    try {
      const res = await getpromptRes(text);

      if (res) {
        const message: any = await createMessage({
          type: "text",
          path: "recieved",
          content: res!,
        });

        if (message) {
          const added = await addMessageToHistory(conversationid, message._id);
        }
        addmessages({
          text: res,
          type: "recieved",
        });
      }
    } catch (error) {
      toast("an error occured while generating response");
    } finally {
      setText("");
      setLoading(false);
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
          {
            loading ? <div></div> :   <Plane onClick={messagePrompt} color="white" />
          }
       
        </div>
      </div>

      <div className="px-6 py-2 rounded-3xl self-start bg-slate-400 text-white font-medium">
        Generate Image
      </div>
    </div>
  );
};

export default TextPromptContainer;
