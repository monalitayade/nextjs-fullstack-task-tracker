"use client";
import React, { useState } from "react";
import Header from "../header/page";
import Sidenav from "../sidenav/page";
import { usePathname } from "next/navigation";

const page = ({ children }) => {
  const pathname = usePathname();

  const [mobMenu, setMobMenu] = useState(false);

  console.log("pathname", pathname);

  //   const hideComponent = pathname === "/login" || pathname === "/sign-up";
  const hideComponent = ["/login", "/sign-up"].includes(pathname);

  return (
    <div className="flex flex-col">
      {!hideComponent && <Header setMobMenu={setMobMenu} />}
      <div className="flex w-full">
        {!hideComponent && (
          <div className={`w-[23%] lg:flex hidden`}>
            <Sidenav />
          </div>
        )}
        <div className="w-[100%] lg:min-h-[90.5vh] sm:min-h-[unset]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default page;
