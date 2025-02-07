import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/task-list", "/assign-task-list"];
  const authRoutes = ["/login", "/sign-up"];

  // Redirect everyone to /login if they are on the home page
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow unauthenticated access to login and sign-up pages
  if (!token) {
    if (!authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Prevent logged-in users from accessing login/sign-up
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/task-list", req.url));
  }

  // Restrict /assign-task-list to admins only
  if (pathname === "/assign-task" && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Check if token is expired
  const currentTime = Math.floor(Date.now() / 1000);
  if (token.exp < currentTime) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/sign-up", "/task-list", "/assign-task"],
};
