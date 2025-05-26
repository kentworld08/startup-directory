import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const NextAuth = require("next-auth").default;

const anyNextAuth: any = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
});

export const { handlers, auth, signIn, signOut } = anyNextAuth;
