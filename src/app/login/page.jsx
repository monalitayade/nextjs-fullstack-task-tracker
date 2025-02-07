"use client";
// import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ToastPop from "@/app/component/toastmessage/page";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("loginform", loginForm);

    if (response?.error) {
      console.log("Invalid credentials.");
      setError(response?.error);
    } else {
      router.push("/task-list");
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-wrap justify-center items-center bg-[#F5F7FF]">
      <ToastPop message={error} setError={setError} />
      <div className="lg:w-1/3 w-10/12 flex justify-center items-center flex-col form-bg-glass-effect p-3 border rounded-md ">
        <h1 className="text-[#7978e9] uppercase text-2xl font-semibold">
          Sign In
        </h1>
        <form className="w-full flex flex-col " onSubmit={handleLogin}>
          <div className="w-full flex flex-col">
            <input
              type="text"
              id="email"
              className="p-2 mt-2 rounded-md text-[#7978e9] focus:outline-none"
              placeholder="email"
              name="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
          </div>

          <div className="w-full flex flex-col mt-3">
            <input
              type="password"
              id="password"
              className="p-2 mt-2 rounded-md text-[#7978e9] focus:outline-none"
              name="password"
              placeholder="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </div>

          <div className="w-full flex flex-col mt-9">
            <button className="bg-[#7978e9] font-semibold text-white p-2 rounded-md focus:outline-none">
              Sign In
            </button>
          </div>
          <div className="w-full flex flex-col">
            <p className="text-[#7978e9] text-right my-2 text-sm">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="border-0 border-b-2 border-[#7978e9]">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
