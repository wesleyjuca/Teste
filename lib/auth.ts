import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

const TEST_MODE_ENABLED = process.env.AUTH_TEST_MODE !== "false";
const TEST_LOGIN = "admin@eproc";
const TEST_PASSWORD = "Admin@123";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma as never),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        if (
          TEST_MODE_ENABLED &&
          parsed.data.email === TEST_LOGIN &&
          parsed.data.password === TEST_PASSWORD
        ) {
          return {
            id: "test-admin-user",
            email: TEST_LOGIN,
            name: "Administrador (Teste)",
            role: "ADMIN"
          };
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email }
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
    })
  ]
});
