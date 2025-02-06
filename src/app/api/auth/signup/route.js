import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request) {
  const { username, email, role, password, cpassword } = await request.json();

  const isValidEmail = (email) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email);
  };
  if (!username || !email || !role || !password || !cpassword) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }
  if (cpassword !== password) {
    return NextResponse.json(
      { message: "Password doesn't matched with confirm password" },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password length should be greater than 6" },
      { status: 400 }
    );
  }
  // Validate role (ensure it is 'admin' or 'user')
  if (!["admin", "user", "Admin", "User"].includes(role)) {
    return NextResponse.json(
      { message: "Invalid role. It must be 'admin' or 'user'" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exist",
        },
        { status: 400 }
      );
    }
    //const hasedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      role: role.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
