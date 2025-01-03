"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useMsgStore } from "@/store/message.store";
import useGetParam from "@/lib/hooks/useGetParams";
import { getHistoryById } from "@/lib/actions/history.actions";
import { formatTextRes } from "@/lib/utils";

const MessageBox = () => {
  const { messages, setMsg } = useMsgStore();
  const { getParamValue } = useGetParam();
  const [urlparams, setUrlParams] = useState<string | null>(null);

  useEffect(() => {
    setUrlParams(getParamValue("chat"));
  }, [getParamValue]);

  useEffect(() => {
    (async function fetchMessages() {
      if (!urlparams) return;

      try {
        const res: any = await getHistoryById(urlparams);
        setMsg(res?.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    })();
  }, [urlparams, setMsg]);

  return (
    <ScrollArea className="w-full h-[75%] flex flex-col pt-8 px-4">
      {messages.length > 0 ? (
        <div className="flex flex-col w-full gap-8">
          {messages.map((message, index) => {
            const formattedContent = `<p> ${formatTextRes(
              message.content
            )} </p>`;
            return (
              <div
                key={index}
                className={`${
                  message.path === "sent"
                    ? "self-end bg-slate-300 "
                    : "self-start bg-slate-200"
                } px-8 py-2 rounded-2xl w-fit max-w-[50%]`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formattedContent,
                  }}
                  className="flex flex-col gap-4"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="my-24 flex items-center justify-center">
          <h4 className="font-bold text-gray-500 text-5xl">
            What can i help With?
          </h4>
        </div>
      )}
    </ScrollArea>
  );
};

export default MessageBox;
