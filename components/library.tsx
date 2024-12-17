import React, { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const History = ({ user }: { user: any }) => {
  console.log(user.history);
  return (
    <div className="px-3 py-2 border-r-1 border-r-black flex-1 flex-shrink-0 h-full ">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        History
      </h2>
      <ScrollArea>
        {user?.history?.length > 0 ? (
          <div>
            {user.history.map((history: any, index: number) => (
              <div key={index}>{history?.messages[0]?.content}</div>
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
