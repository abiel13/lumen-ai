import React, { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const History = ({ user }: { user: any }) => {

  return (
    <div className="px-3 py-2 border-r-1 border-r-black flex-1 flex-shrink-0 h-full ">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        History
      </h2>
      <ScrollArea>
        {user?.history?.length > 0 ? (
          <div className="px-4 py-3 gap-4 flex flex-col">
            {user.history.map((history: any, index: number) => (
              <div className="text-lg font-sans font-medium bg-gray-200 w-full rounded-md px-4 py-2" key={index}>{history?.messages[0]?.content.substring(0,36)}</div>
            ))}
          </div>
        ) : (
          <p> No Search History </p>
        )}
      </ScrollArea>
    </div>
  );
};

export default History;
