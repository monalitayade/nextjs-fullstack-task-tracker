"use client";
import Image from "next/image";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/logo.svg";
import Search from "@/assets/images/search.svg";
import Profile from "@/assets/images/Profile.svg";
import Cart from "@/assets/images/Cart.svg";

function Header() {
  const { data: session, status } = useSession();

  const router = useRouter();

  //status for login/logout button
  console.log("session", session?.user?.role, status);
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut({ redirect: false }); // Prevent default redirect
    router.push("/login"); // Manually redirect to login page
  };

  return (
    <header className="w-full flex flex-row bg-[#7978e9] py-3 px-2 shadow-slate-600">
      <div className="w-full flex items-center">
        <a href="/" className="text-black mr-3">
          {/* <Img
            src="/src/assets/images/logo.svg"
            width={30}
            height={30}
            alt="logo"
          /> */}
          <Image src={Logo} width={30} height={30} alt="logo" />
        </a>

        <div className="w-auto text-white font-semibold text-xl">
          Task Tracker
        </div>
      </div>
      {/* {session?.user?.role === "admin" && (
        <a
          href="/assign-task"
          className="ml-auto bg-white rounded-sm px-5 py-2 text-red-300">
          Assign Task
        </a>
      )} */}
      {session && (
        <button
          onClick={(e) => handleLogout(e)}
          className="ml-4 py-0 text-white px-4 ">
          Logout
        </button>
      )}
      {/* <nav className="w-full flex flex-row justify-between items-center">
        <ul className="flex">
          <li className="flex px-4">
            <a href="/" className="text-black text-sm">
              Men
            </a>
          </li>
          <li className="flex px-4">
            <a href="/" className="text-black text-sm">
              Women
            </a>
          </li>
          <li className="flex px-4">
            <a href="/" className="text-black text-sm">
              Kids
            </a>
          </li>
        </ul>
      </nav>
      <div className="w-auto flex flex-row items-center">
        <div
          className="w-auto flex flex-row justify-between  rounded-full"
          dir="ltr">
          <input
            type="text"
            name="search"
            className="text-black px-3 py-2 focus:outline-none border-[1px] rounded-s-full"
          />
          <button className="w-[30px] border rounded-s-full p-[3px]" dir="rtl">
            <Image src={Search} width={30} height={30} alt="logo" />
          </button>
        </div>
        <div className="w-auto flex flex-row">
          <div className="w-[28px] mx-2">
            <Image src={Profile} width={28} height={28} alt="logo" />
          </div>
          <div className="w-[28px] mx-2">
            <Image src={Cart} width={28} height={28} alt="logo" />
          </div>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
