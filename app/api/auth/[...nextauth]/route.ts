import User from "@models/mongoose/User";
import connectToDB from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    avatar_url?: string;
  }
}

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      if (session.user?.email) {
        const sessionUser = await User.findByEmail(session.user!.email!);
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        if (profile?.email) {
          const userExists = await User.findByEmail(profile.email);

          if (!userExists) {
            const newUser = User.build({
              email: profile.email,
              username: profile.name!.replaceAll(" ", ""),
              image: profile?.avatar_url,
            });
            await newUser.save();
          }
          return true;
        }

        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
