import { Sidebar } from "@/components/sidebar";
import { getUserHistory } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    let userdata = null;
    try {
        userdata = await getUserHistory(user.id);
    } catch (error) {
        console.error("Error fetching user history:", error);
        // Continue with null userdata - sidebar will handle it gracefully
    }

    return (
        <div className="h-screen">
            <main className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 flex flex-row relative h-full">
                <Sidebar user={userdata} />
                <main className="flex-1 overflow-hidden">{children}</main>
            </main>
        </div>
    );
};

export default ChatLayout;

