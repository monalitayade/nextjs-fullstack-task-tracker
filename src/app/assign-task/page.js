"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [taskForm, setTaskForm] = useState({
    taskassignee: "",
    taskName: "",
    taskDesc: "",
    taskStatus: "",
  });
  const [status, setStatus] = useState([
    "Incomplete",
    "Inprogress",
    "Complete",
  ]);
  const [assigner, setAssigner] = useState("");
  const [assignee, setAssignee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAssigner = async () => {
    try {
      const userResponse = await fetch("/api/users?role=admin");
      const data = await userResponse.json();
      // setAssigner(data?.users);
      // console.log("userResponse", data?.users);

      let getAdmin = data?.users.map((admin, index) => {
        // console.log("admin", admin.username);
        return admin?.username;
      });
      setAssigner(getAdmin);
      return getAdmin;
    } catch (err) {
      console.log("error:", err);
    }
  };
  const fetchAssignee = async () => {
    try {
      const userResponse = await fetch("/api/users?role=user");
      const data = await userResponse.json();

      let getUser = data?.users.map((user) => user?.username);

      setAssignee(getUser);
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const userResponse = await fetch("/api/users");
    //     const data = await userResponse.json();
    //     setUser(data?.users);
    //     //console.log("userResponse", data);
    //   } catch (err) {
    //     console.log("error:", err);
    //   }
    // };
    // fetchUser();
    fetchAssigner();
    fetchAssignee();
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    console.log("taskForm", taskForm);
    setLoading(true);
    const res = await fetch("/api/task-list", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(taskForm),
    });
    console.log("response tasklist", res);
    const data = await res.json();
    if (res?.ok) {
      setLoading(false);
      router.push("/");
    } else if (res.status === 400) {
      setError(data.message);
      setLoading(false);
    } else if (res.status === 500) {
      setError(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-wrap justify-center items-center bg-slate-300">
      <div className="w-1/3 flex justify-center items-center flex-col bg-gray-700 p-3 border rounded-md">
        <h1 className="text-white text-xl mb-3">Assign Task</h1>
        <form className="w-full flex flex-col" onSubmit={handleTaskSubmit}>
          {/* <div className="w-full flex flex-col">
            <select
              className="text-black focus:outline-none py-2"
              placeholder="Assignee">
              <option key={assigner[0]} value={assigner[0]}>
                {assigner[0]}
              </option>
            </select>
          </div> */}
          <div className="w-full flex flex-col mt-3">
            <select
              id="taskassignee"
              className="text-black focus:outline-none py-2"
              placeholder="Assign to"
              value={taskForm.taskassignee}
              onChange={(e) =>
                setTaskForm({ ...taskForm, taskassignee: e.target.value })
              }>
              <option>Assignee name</option>
              {assignee?.map((assignee, i) => {
                return <option key={i}>{assignee}</option>;
              })}
            </select>
          </div>
          <div className="w-full flex flex-col mt-3">
            <input
              type="text"
              id="taskName"
              className="p-2 mt-2  text-black"
              placeholder="Task name"
              value={taskForm.taskName}
              onChange={(e) =>
                setTaskForm({ ...taskForm, taskName: e.target.value })
              }
            />
          </div>

          <div className="w-full flex flex-col mt-3">
            <textarea
              id="taskDesc"
              className="text-black p-2 resize-none"
              placeholder="Task description"
              cols={5}
              rows={3}
              value={taskForm.taskDesc}
              onChange={(e) =>
                setTaskForm({ ...taskForm, taskDesc: e.target.value })
              }></textarea>
          </div>

          <div className="w-full flex flex-col mt-3">
            <select
              id="taskStatus"
              className="text-black focus:outline-none py-2"
              placeholder="Assignee"
              name="taskStatus"
              value={taskForm.taskStatus}
              onChange={(e) =>
                setTaskForm({ ...taskForm, taskStatus: e.target.value })
              }>
              <option>Status</option>
              {status?.map((status, s) => {
                return <option key={s}>{status}</option>;
              })}
            </select>
          </div>
          <div className="w-full flex flex-col mt-9">{error}</div>
          <div className="w-full flex flex-col mt-9">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={loading ? true : false}>
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
