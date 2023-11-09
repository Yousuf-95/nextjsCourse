import { verifyPassword } from "@/lib/auth";
import dbConnect from "@/lib/mongodbUtils";
import UserModel from "@/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();

        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Incorrect email/password combination");
        }

        return { email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET // required in production
});
