"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-sans font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Lumen AI
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
