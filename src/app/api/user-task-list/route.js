import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import TaskList from "@/models/tasklist";
import User from "@/models/user";

export async function GET() {
  try {
    await connectToDatabase();
    const UsersWithTask = await User.aggregate([
      {
        $lookup: {
          from: "tasklists",
          localField: "username",
          foreignField: "assignee",
          as: "UserDetails",
        },
      },
    ]);

    return NextResponse.json({ Userdata: UsersWithTask }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

// export async function PATCH(req) {
//   const { taskId, status, seen } = await req.json();

//   try {
//     if (!taskId) {
//       return NextResponse.json(
//         { success: false, message: "Task id is mandatory." },
//         { Status: 400 }
//       );
//     }

//     await connectToDatabase();

//     // Prepare update fields dynamically
//     const updateFields = {};
//     if (status) updateFields.status = status;
//     if (seen !== undefined) updateFields.seen = seen;

//     const UpdatedTask = await TaskList.findOneAndUpdate(
//       { taskId },
//       // { ...(status && { status }), ...(seen !== undefined && { seen }) },
//       {updateFields},
//       { new: true }
//     );

//     if (!UpdatedTask) {
//       return NextResponse.json(
//         { success: false, message: "Task not found." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Task has been updated successfully!",
//         task: UpdatedTask,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Something went wrong!" },
//       { status: 500 }
//     );
//   }
// }
