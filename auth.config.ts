import type { NextAuthConfig } from "next-auth";

const authConfig = {
  pages: { signIn: "/auth/login" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith("/auth/");

      if (isAuthPage) return true;

      if (!isLoggedIn) {
        const loginUrl = new URL("/auth/login", nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", nextUrl.href);
        return Response.redirect(loginUrl);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
