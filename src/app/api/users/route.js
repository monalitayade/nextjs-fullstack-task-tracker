import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import React from "react";

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);

  // const getTokenData = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });
  // if (!getTokenData || getTokenData.role != "admin") {
  //   return NextResponse.json(
  //     { success: false, message: "Unauthorized user !" },
  //     { status: 403 }
  //   );
  // }

  try {
    const role = searchParams.get("role");

    let users;

    if (role) {
      users = await User.find({ role });
    } else {
      users = await User.find();
    }

    return NextResponse.json(
      { success: true, message: "User fetched successfully !", users },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    console.log("Error while fetching users:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. !" },
      { status: 500 }
    );
  }
}
