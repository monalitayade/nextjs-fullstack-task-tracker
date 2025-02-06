"use client";
import Image from "next/image";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Logo from "@/assets/images/logo.svg";
import Search from "@/assets/images/search.svg";
import Profile from "@/assets/images/Profile.svg";
import Cart from "@/assets/images/Cart.svg";

function Header() {
  const { data: session, status } = useSession();

  //status for login/logout button
  console.log("session", session?.user?.role, status);

  return (
    <header className="w-full flex bg-red-300 py-3 px-2">
      <div className="w-20 ">
        <a href="/" className="text-black">
          {/* <Img
            src="/src/assets/images/logo.svg"
            width={30}
            height={30}
            alt="logo"
          /> */}
          <Image src={Logo} width={30} height={30} alt="logo" />
        </a>
      </div>
      <div className="w-auto text-white text-2xl">Task Tracker</div>
      {session?.user?.role === "admin" && (
        <a
          href="/assign-task"
          className="ml-auto bg-white rounded-sm px-5 py-2 text-red-300">
          Assign Task
        </a>
      )}
      {session && (
        <button
          onClick={() => signOut()}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded">
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
