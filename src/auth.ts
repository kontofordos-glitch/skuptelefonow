import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    Credentials({
      name: "Email i hasło",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Hasło", type: "password" },
        totp: { label: "Kod 2FA", type: "text" }
      },
      async authorize(credentials) {
        const payload = loginSchema.safeParse(credentials);
        if (!payload.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: payload.data.email }
        });

        if (!user || !(await bcrypt.compare(payload.data.password, user.passwordHash))) {
          return null;
        }

        if (user.twoFactorEnabled) {
          if (!payload.data.totp || !user.twoFactorSecret || !authenticator.check(payload.data.totp, user.twoFactorSecret)) {
            return null;
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          twoFactorEnabled: user.twoFactorEnabled
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.twoFactorEnabled = user.twoFactorEnabled;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.twoFactorEnabled = Boolean(token.twoFactorEnabled);
      }
      return session;
    }
  }
});
