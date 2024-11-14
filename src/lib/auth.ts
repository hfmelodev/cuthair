import { PrismaAdapter } from '@auth/prisma-adapter'
import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as any

      return session
    },
  },
}