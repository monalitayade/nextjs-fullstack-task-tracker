"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", e, form);
    setPending(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    });
    console.log("response", res);

    const data = await res.json();
    if (res.ok) {
      setPending(false);
      router.push("/login");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-wrap justify-center items-center bg-slate-300">
      <div className="w-1/3 flex justify-center items-center flex-col bg-gray-700 p-3 border rounded-md">
        <h1 className="text-white">Sign In</h1>
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <input
              type="text"
              id="username"
              className="p-2 mt-2 rounded-md text-black"
              placeholder="User name"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <input
              type="email"
              id="email"
              className="p-2 mt-2 rounded-md text-black"
              placeholder="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <input
              type="text"
              id="role"
              className="p-2 mt-2 rounded-md text-black"
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <input
              type="password"
              id="password"
              className="p-2 mt-2 rounded-md text-black"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <input
              type="password"
              id="cpassword"
              className="p-2 mt-2 rounded-md text-black"
              placeholder="Confirm Password"
              value={form.cpassword}
              onChange={(e) => setForm({ ...form, cpassword: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col mt-9">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={pending ? true : false}>
              Sign In
            </button>
          </div>
          <div className="w-full flex flex-col mt-9 text-red-600 text-center">
            {error}
          </div>

          <div className="w-full flex flex-col">
            <p className="text-white text-right my-2 text-sm">
              Already have an account?{" "}
              <a href="/login" className="border-0 border-b-2">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
