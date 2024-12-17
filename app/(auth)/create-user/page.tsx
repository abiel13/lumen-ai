import CreateUserComp from "@/components/create-user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const CreateUser = async () => {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  return <div className="h-full w-full bg-black/30 flex items-center justify-center relative">
    <CreateUserComp user={user.id} />      
  </div>;
};

export default CreateUser;
