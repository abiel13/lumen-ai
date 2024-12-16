import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" ">
      <main className="flex-1 bg-[#fafafa] flex flex-row relative">
        <Sidebar />

        <section className="flex-1">{children}</section>
      </main>
    </div>
  );
};

export default RootLayout;
