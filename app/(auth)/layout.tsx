
import Image from "next/image";
import React from "react";

export const metadata = {
  title:'Sign up | Sign in to EcraComm',
  description:''
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-screen">
    <Image src={"/pat.jpg"} alt="image" fill />
      {children}
    </div>
  );
};

export default AuthLayout;
