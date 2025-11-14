import MessageBox from "@/components/MessageBox";
import TextPromptContainer from "@/components/TextPromptContainer";
import Navbar from "@/components/navbar";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const ChatPage = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const dbuser = await getUserByClerkId(user!.id);

    if (!dbuser) {
        redirect("/create-user");
    }

    return (
        <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />
            <div className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-full">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                }>
                    <MessageBox />
                </Suspense>
            </div>
            <div className="pb-6 pt-4">
                <TextPromptContainer userid={user!.id} />
            </div>
        </div>
    );
};

export default ChatPage;

