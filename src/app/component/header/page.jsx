"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/logo.svg";
import Profile from "@/assets/images/profile.svg";
import Nav from "@/assets/images/nav.svg";
import Notification from "@/assets/images/notification.svg";

function Header({ setMobMenu, mobMenu }) {
  const { data: session } = useSession();

  const router = useRouter();

  console.log("session", session?.user);

  const [logoutPopUp, setLogoutPopUp] = useState(false);
  const [activeUser, setActiveUser] = useState([]);
  const [activeUsername, setActiveUsername] = useState();
  const [usertasklist, setUserTaskList] = useState();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotification] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [markRead, setMarkRead] = useState({
    taskId: "",
    status: "",
    seen: false,
  });

  useEffect(() => {
    const checkExpiry = () => {
      if (session?.user?.expires < Math.floor(Date.now() / 1000)) {
        signOut();
      }
    };

    const timer = setInterval(checkExpiry, 10000);
    return () => clearInterval(timer);
  }, [session]);

  const fetchUserTaskList = async () => {
    setLoading(true);
    try {
      const userResponse = await fetch("/api/user-task-list");
      const data = await userResponse.json();
      // console.log("data", data?.Userdata);
      setUserTaskList(data?.Userdata);
      setNotification(data?.Userdata?.UserDetails);
      setLoading(false);
    } catch (err) {
      console.log("error:", err);
      setLoading(true);
    }
  };

  const fetchActiveUserDetails = () => {
    const getActiveUserDetails = usertasklist?.filter(
      (taskData) => taskData?.email === session?.user?.email
    );
    setActiveUser(getActiveUserDetails);
  };

  useEffect(() => {
    fetchUserTaskList();
  }, []);

  useEffect(() => {
    fetchActiveUserDetails();
  }, [usertasklist, session]);

  useEffect(() => {
    console.log("activeuser", activeUser, activeUser?.[0]?.username);
    setActiveUsername(activeUser?.[0]?.username);
    setNotification(activeUser?.[0]?.UserDetails);
  }, [activeUser]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut({ redirect: false });
    router.push("/login");
  };

  const handleSeenNotifications = async (e, notifications) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/task-list", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          taskId: notifications?.taskId,
          status: notifications?.status,
          seen: true,
        }),
      });

      const data = await res?.json();
      if (data.success) {
        fetchUserTaskList();
      } else {
        console.error("Task update failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <header className="w-full flex flex-row bg-[#7978e9] py-3 px-2 drop-shadow-lg">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex w-10 mr-3">
        <button
          className="w-full text-white"
          onClick={() => setMobMenu(!mobMenu)}>
          {mobMenu ? (
            "X"
          ) : (
            <Image width={24} height={24} alt="navigation" src={Nav} />
          )}
        </button>
      </div>

      {/* Logo and Title */}
      <div className="w-full flex items-center">
        <a href="/" className="text-black mr-3">
          <Image src={Logo} width={30} height={30} alt="logo" />
        </a>
        <div className="w-auto text-white font-semibold text-xl">
          Task Tracker
        </div>
      </div>

      {/* Notification */}
      {console.log("Notifications", notifications)}
      {notifications?.length >= 0 && (
        <div className="w-[3%] relative ml-3">
          <button
            className="w-[100%] flex flex-wrap items-center  py-0 text-white relative"
            onClick={() => setShowNotifications((prev) => !prev)}>
            <Image width={30} height={30} alt="profile" src={Notification} />
            {console.log(
              "monali 128:",
              notifications,
              notifications?.filter((seenNoti) => seenNoti?.seen === false)
                .length
            )}
            {notifications?.length > 0 && (
              <p className="w-4 h-4 absolute -top-1 -right-0 z-10 bg-red-700 text-white text-xs rounded-full">
                {
                  notifications?.filter((seenNoti) => seenNoti?.seen === false)
                    .length
                }
              </p>
            )}
          </button>
          {showNotifications && (
            <div className="w-[450px] absolute top-[35px] right-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] bg-white">
              <div className="w-full block bg-[#7978e9] text-white text-[16px] font-semibold font-sans py-2 px-2">
                Notification
              </div>

              <div className="w-full h-[250px] overflow-y-auto  bg-white flex flex-col py-2">
                {notifications?.length !== 0 ? (
                  notifications?.map((noti, n) => {
                    {
                      console.log("noti", noti);
                    }
                    return (
                      <div
                        className={`w-full flex flex-col mb-2 px-2 py-1 border-b notification-block border-[#cccccc] ${
                          noti?.seen !== true ? "bg-slate-200" : "bg-white"
                        }`}
                        key={n}>
                        <div className="w-full flex justify-between text-[16px] font-semibold font-sans text-[#4e545c]">
                          {noti?.taskname}
                          <button
                            className="text-[12px] font-sans font-normal border-b border-[#7978e9] text-[#7978e9]
                          "
                            onClick={(e) => handleSeenNotifications(e, noti)}>
                            Mark as read
                          </button>
                        </div>
                        <div className="text-[14px] font-sans text-[#4e545c]">
                          {noti?.taskdesc}
                        </div>
                        <div className="text-[14px] font-sans text-[#4e545c]">
                          <span className="font-semibold mr-1">Status:</span>
                          {noti?.status}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full bg-white flex p-1">
                    {" "}
                    <p className="text-[16px] font-semibold font-sans text-[#4e545c]">
                      No task in your list.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Profile and Logout */}
      {session && (
        <button
          onClick={() => setLogoutPopUp((prev) => !prev)}
          className="w-[10%] flex flex-wrap items-center ml-3 py-0 text-white relative">
          <Image width={30} height={30} alt="profile" src={Profile} />

          {activeUsername && <p className="text-sm ml-1">{activeUsername}</p>}
          {logoutPopUp && (
            <div className="w-[200px] absolute top-[35px] right-[21px] bg-white p-3 shadow-2xl">
              <div
                className="text-[#7978e9] cursor-pointer font-semibold"
                onClick={handleLogout}>
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
