import React from "react";
import { useSession, signOut } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col min-h-[90.5vh] w-full bg-[#7978e9] text-white font-semibold text-2xl py-4 ">
      <ul>
        {session?.user?.role === "admin" && (
          <li className="border-0 border-b-[1px] border-[#ccc] px-4">
            <a
              href="/assign-task"
              className="flex font-sans font-regular text-[16px] px-5 py-2 text-white
              ">
              Assign Task
            </a>
          </li>
        )}
        <li>Comming soon</li>
      </ul>
    </div>
  );
};

export default page;
