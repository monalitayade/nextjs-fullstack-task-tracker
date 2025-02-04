import { NextResponse } from "next/server";
import TaskList from "@/models/tasklist";
import connectToDatabase from "@/lib/mongodb";
import { v4 } from "uuid";

export async function POST(req) {
  const { taskassignee, taskName, taskDesc, taskStatus } = await req.json();

  if (!taskassignee || !taskName || !taskDesc || !taskStatus) {
    return NextResponse.json(
      { message: "All fields are mandatory !" },
      { Status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const newTask = new TaskList({
      taskId: v4(),
      assignee: taskassignee,
      taskname: taskName,
      taskdesc: taskDesc,
      status: taskStatus.toLowerCase(),
    });

    await newTask.save();

    console.log("Task Saved:", newTask);

    return NextResponse.json(
      {
        success: true,
        message: "Task created successfully !",
        task: newTask,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong !" },
      { status: 500 }
    );
  }
}
