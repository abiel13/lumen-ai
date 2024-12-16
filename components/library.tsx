import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const History = () => {
  return (
    <div className="px-3 py-2 border-r-1 border-r-black flex-1 flex-shrink-0 h-full ">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        History
      </h2>
      <ScrollArea>
        <p className="text-gray-300 px-4">No search History</p>
      </ScrollArea>
    </div>
  );
};

export default History;
