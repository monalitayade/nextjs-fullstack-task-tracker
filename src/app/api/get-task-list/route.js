import { NextResponse } from "next/server";
import TaskList from "@/models/tasklist";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();

    const tasklist = await TaskList.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, message: "Task List fetched successfully !", tasklist },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error while fetching users:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong !" },
      { status: 500 }
    );
  }
}
