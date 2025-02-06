import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        //connect to database
        await connectToDatabase();

        //Find user by email
        const user = await User.findOne({ email: credentials.email });

        if (credentials.email === "" || credentials?.password === "") {
          throw new Error("All fields are required !");
        }

        if (!user) {
          console.log("User not found:", credentials.email);
          throw new Error("No user found");
        }

        console.log("User found:", user);

        // Compare passwords
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("Password valid:", isValid);

        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "auth/login",
  },
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user 64", user);

        // token.id = user.id;
        // token.email = user.email;
        // token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // session.user.id = token.id;
      // session.user.email = token.email;
      // session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
// export const { GET, POST } = NextAuth(handler);

// export default handler;
