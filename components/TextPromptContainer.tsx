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
import { revalidateHome } from "@/lib/actions/actions";

const TextPromptContainer = ({ userid }: { userid: string }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { addmessages } = useMsgStore();
  const updateParams = useUpdateParams();
  const { getParamValue } = useGetParam();

  async function createuserhistory() {
    const conversationId = genuid();

    try {
      await updateParams("chat", conversationId);
      const history: any = await createHistory({
        conversationId,
        messages: [],
      });
      await addHistoryToUser(userid, history._id);
      return conversationId;
    } catch (error: any) {
      console.log("Error creating user history:", error.message);
      throw new Error("Failed to create user history");
    }
  }

  async function messagePrompt() {
    if (!text.length) {
      return; // Ensure there's text to process
    }

    let conversationId = getParamValue("chat");

    if (!conversationId) {
      try {
        // Create user history if no conversation ID exists
        conversationId = await createuserhistory();

        if (!conversationId) {
          throw new Error("Failed to create or fetch conversation ID");
        }
      } catch (error) {
        console.error(
          "Error in messagePrompt while creating conversation ID:",
          error
        );
        toast("An error occurred while creating user history");
        return;
      }
    }

    try {
      setLoading(true);

      addmessages({
        text,
        type: "sent",
      });

      // Create the sent message in the database
      const sentMessage: any = await createMessage({
        type: "text",
        path: "sent",
        content: text,
      });

      if (sentMessage) {
        await addMessageToHistory(conversationId, sentMessage._id);
      }
    } catch (error) {
      console.error("Error while sending the message:", error);
      toast("An error occurred while sending the message");
      return;
    }
    finally{
      setLoading(false)
    }

    try {
      // Fetch response for the user's message
      const responseText = await getpromptRes(text);
      if (responseText) {
        const receivedMessage: any = await createMessage({
          type: "text",
          path: "recieved",
          content: responseText,
        });

        if (receivedMessage) {
          await addMessageToHistory(conversationId, receivedMessage._id);
        }

        // Add the AI's response to UI
        addmessages({
          text: responseText,
          type: "recieved",
        });
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast("An error occurred while generating a response");
    } finally {
      setText("");
      setLoading(false); // Reset loading state
      await revalidateHome(); // Update the home page data
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
          {loading ? (
            <div></div>
          ) : (
            <Plane onClick={messagePrompt} color="white" />
          )}
        </div>
      </div>

      <div className="px-6 py-2 rounded-3xl self-start bg-slate-400 text-white font-medium">
        Generate Image
      </div>
    </div>
  );
};

export default TextPromptContainer;
