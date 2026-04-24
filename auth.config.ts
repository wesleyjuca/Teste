import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [],
  pages: { signIn: "/auth/login" },
  callbacks: {
    authorized() {
      // Temporariamente permite acesso sem autenticação.
      // Reverter para restaurar redirecionamento ao login.
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
