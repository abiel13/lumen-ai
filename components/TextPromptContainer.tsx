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
        content: text,
        path: "sent",
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
    finally {
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
          content: responseText,
          path: "recieved",
        });
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast("An error occurred while generating a response");
    } finally {
      setText("");
      setLoading(false); // Reset loading state
      try {
        await revalidateHome(); // Update the home page data
      } catch (error) {
        console.error("Error revalidating home:", error);
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 items-center justify-center py-4 px-4">
      <div className="w-full flex-row items-center flex gap-3 bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-2">
        <Input
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !loading) {
              e.preventDefault();
              messagePrompt();
            }
          }}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base py-6"
          placeholder="Type your message here..."
          disabled={loading}
        />
        <button
          onClick={messagePrompt}
          disabled={loading || !text.trim()}
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plane className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Press Enter to send</span>
        <span>•</span>
        <span>Shift + Enter for new line</span>
      </div>
    </div>
  );
};

export default TextPromptContainer;
