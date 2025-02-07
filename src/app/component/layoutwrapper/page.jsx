"use client";
import React, { useState } from "react";
import Header from "../header/page";
import Sidenav from "../sidenav/page";
import { usePathname } from "next/navigation";

const page = ({ children }) => {
  const pathname = usePathname();

  const [mobMenu, setMobMenu] = useState(false);

  console.log("setMobMenu", mobMenu);

  const hideComponent = ["/login", "/sign-up"].includes(pathname);

  return (
    <div className="flex flex-col">
      {!hideComponent && <Header setMobMenu={setMobMenu} mobMenu={mobMenu} />}
      <div className="flex w-full lg:static fixed top-[54px] left-0">
        {!hideComponent && (
          <div
            className={`md:w-[23%] w-[50%] lg:flex lg:static fixed top-[54px] transition-all duration-200 ease-in-out ${
              mobMenu ? "left-0" : "left-[-100%]"
            } `}>
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
