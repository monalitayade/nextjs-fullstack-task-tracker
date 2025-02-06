"use client";
import React from "react";
import Header from "../header/page";
import Sidenav from "../sidenav/page";
import { usePathname } from "next/navigation";

const page = ({ children }) => {
  const pathname = usePathname();

  console.log("pathname", pathname);

  //   const hideComponent = pathname === "/login" || pathname === "/sign-up";
  const hideComponent = ["/login", "/sign-up"].includes(pathname);

  return (
    <div className="flex flex-col">
      {!hideComponent && <Header />}
      <div className="flex w-full">
        {!hideComponent && (
          <div className="w-[23%]">
            <Sidenav />
          </div>
        )}
        <div className="w-[100%] min-h-[90.5vh]">{children}</div>
      </div>
    </div>
  );
};

export default page;
