import { AuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "DUMMY_KAKAO_CLIENT_ID",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "DUMMY_KAKAO_CLIENT_SECRET",
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isAdmin: { label: "IsAdmin", type: "text" }
      },
      async authorize(credentials) {
        // Admin verification
        if (credentials?.isAdmin === "true") {
          const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
          if (credentials.password === adminPass) {
            return { id: "admin-1", name: "관리자", email: "admin@hanil.com", role: "admin" };
          }
          return null;
        }
        
        // Mock DB verification for regular users
        if (credentials?.email && credentials?.password) {
          return { id: "1", name: credentials.email.split('@')[0], email: credentials.email, role: "user" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};
