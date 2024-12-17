import MessageBox from "@/components/MessageBox";
import TextPromptContainer from "@/components/TextPromptContainer";
import Navbar from "@/components/navbar";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

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
    <div className="px-8 overflow-y-hidden relative  h-screen">
      <Navbar />
      <MessageBox />
      <TextPromptContainer />
    </div>
  );
};

export default ChatPage;
