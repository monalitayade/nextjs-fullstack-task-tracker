"use client";
// import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

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
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-wrap justify-center items-center bg-slate-300">
      <div className="w-1/3 flex justify-center items-center flex-col bg-gray-700 p-3 border rounded-md">
        <h1 className="text-white">Login</h1>
        <form className="w-full flex flex-col " onSubmit={handleLogin}>
          <div className="w-full flex flex-col">
            <input
              type="text"
              id="email"
              className="p-2 mt-2 rounded-md text-black"
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
              className="p-2 mt-2 rounded-md text-black"
              name="password"
              placeholder="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </div>

          <div className="w-full flex flex-col mt-9">
            <button className="bg-blue-500 text-white p-2 rounded-md">
              Sign In
            </button>
          </div>
          <div className="w-full flex flex-col">
            <p className="text-white text-right my-2 text-sm">
              Don't have an account?{" "}
              <a href="/sign-up" className="border-0 border-b-2">
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
