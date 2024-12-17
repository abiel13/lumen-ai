import { Sidebar } from "@/components/sidebar";
import { getUserHistory } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  const userdata = await getUserHistory(user!.id)

  return (
    <div className=" ">
      <main className="flex-1 bg-[#fafafa] flex flex-row relative">
        <Sidebar user={userdata} />

        <section className="flex-1">{children}</section>
      </main>
    </div>
  );
};

export default RootLayout;
