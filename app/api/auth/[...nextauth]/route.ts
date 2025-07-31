import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_build',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST } 