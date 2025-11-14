"use client";
import { createUser, getUserByClerkId } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";

const CreateUserComp = ({ user }: any) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const isuser = await getUserByClerkId(user);
        if (isuser) {
          router.push("/chat");
          return;
        }

        const newuser = await createUser(user!);
        if (newuser) {
          router.push("/chat");
        }
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full max-w-xl min-h-[250px] bg-white shadow-md rounded-md py-8 px-4">
      <h1 className="font-bold font-sanst text-black text-xl font-sans tracking-wide">
        Creating User
      </h1>
      <p className="text-muted-foreground mt-4 font-sans tracking-wide">
        please wait while we create your database user...
      </p>
      {loading && <Rings color="gray" width={40} />}
    </div>
  );
};

export default CreateUserComp;
