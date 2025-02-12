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
    // console.log("taskForm", taskForm);
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
      // addNotification(
      //   taskForm.taskassignee,
      //   ", You have one new task assigned."
      // );
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
    <div className="w-full min-h-[90.5vh] flex flex-wrap justify-center items-center bg-[#F5F7FF] p-4">
      <div className="w-1/2 flex justify-center items-center flex-col px-7 py-7 border rounded-md shadow-lg">
        <h1 className="text-[#7978e9] text-xl font-semibold mb-3">
          Assign Task
        </h1>
        <form
          className="w-full flex flex-wrap flex-row"
          onSubmit={handleTaskSubmit}>
          <div className="w-[48%] flex flex-col mr-[2%]">
            <select
              id="taskassignee"
              className="text-[#7978e9] focus:outline-none py-2"
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
          <div className="w-[48%] flex flex-col">
            <input
              type="text"
              id="taskName"
              className="p-2 w-full text-[#7978e9] focus:outline-none"
              placeholder="Task name"
              value={taskForm.taskName}
              onChange={(e) =>
                setTaskForm({ ...taskForm, taskName: e.target.value })
              }
            />
          </div>
          <div className="w-[48%] flex flex-col mt-3">
            <select
              id="taskStatus"
              className="text-[#7978e9] focus:outline-none py-2 focus:outline-none"
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
          <div className="w-[100%] flex flex-col mt-3">
            <textarea
              id="taskDesc"
              className="text-[#7978e9] p-2 resize-none focus:outline-none"
              placeholder="Task description"
              cols={5}
              rows={3}
              value={taskForm.taskDesc}
              onChange={(e) =>
                setTaskForm({ ...taskForm, taskDesc: e.target.value })
              }></textarea>
          </div>

          <div className="w-full flex flex-col mt-9">{error}</div>
          <div className="w-full flex flex-col mt-9">
            <button
              type="submit"
              className="bg-[#7978e9] text-white p-2 rounded-md font-semibold"
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
