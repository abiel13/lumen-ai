import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-6 bg-[#fafafa]">
        <h3 className="font-sans font-bold text-xl text-gray-800">
          lu:<span className="text-blue-500">Men</span>
        </h3>

        <UserButton />
      </div>
      <div className="px-8">
        <Separator />
      </div>
    </>
  );
};

export default Navbar;
