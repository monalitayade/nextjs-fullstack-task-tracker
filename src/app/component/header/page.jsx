"use client";
import Image from "next/image";
import React, { use, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/logo.svg";
import Search from "@/assets/images/search.svg";
import Profile from "@/assets/images/profile.svg";
import Nav from "@/assets/images/nav.svg";
import Notification from "@/assets/images/notification.svg";

function Header({ setMobMenu }) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [logoutPopUp, setLogoutPopUp] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut({ redirect: false }); // Prevent default redirect
    router.push("/login"); // Manually redirect to login page
  };

  const logoutPopup = () => {
    setLogoutPopUp((prev) => !prev);
  };

  return (
    <header className="w-full flex flex-row bg-[#7978e9] py-3 px-2 shadow-slate-600">
      <div className="lg:hidden flex w-10 mr-3">
        <button className="w-full" onClick={() => setMobMenu(true)}>
          <Image w={10} h={10} alt="navigation" src={Nav} />
        </button>
      </div>
      <div className="w-full flex items-center">
        <a href="/" className="text-black mr-3">
          <Image src={Logo} width={30} height={30} alt="logo" />
        </a>

        <div className="w-auto text-white font-semibold text-xl">
          Task Tracker
        </div>
      </div>

      <button className="ml-4 py-0 text-white  relative">
        <Image width={30} height={30} alt="profile" src={Notification} />
      </button>

      {session && (
        <button
          onClick={() => logoutPopup()}
          className="ml-3 py-0 text-white relative">
          <Image width={30} height={30} alt="profile" src={Profile} />
          {logoutPopUp && (
            <div className="w-[200px] absolute top-[35px] right-[21px] bg-white p-3 shadow-2xl">
              <div
                className="text-[#7978e9] cursor-pointer font-sans font-semibold"
                onClick={(e) => handleLogout(e)}>
                Logout
              </div>
            </div>
          )}
        </button>
      )}
    </header>
  );
}

export default Header;
