"use client";
import React from "react";
import Header from "../header/page";
import { usePathname } from "next/navigation";

const page = ({ children }) => {
  const pathname = usePathname();

  console.log("pathname", pathname);

  //   const hideComponent = pathname === "/login" || pathname === "/sign-up";
  const hideComponent = ["/login", "/sign-up"].includes(pathname);

  return (
    <div>
      {!hideComponent && <Header />}
      {children}
    </div>
  );
};

export default page;
