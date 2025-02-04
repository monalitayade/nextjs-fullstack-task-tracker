import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Define role-based protected routes
  const adminRoutes = ["/admin"];
  const userRoutes = ["/dashboard", "/profile"];

  // If there's no token (user is not logged in)
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Check if the user is trying to access an admin-only route
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect unauthorized users
    }
  }

  // Allow access to user routes (dashboard, profile) if logged in
  if (userRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  return NextResponse.next(); // Allow access to other public routes
}

// Define which routes should trigger the middleware
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*"], // Apply middleware to these routes
};
