import { NextAuthOptions, User, getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import prisma from './prisma';

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const dbUser = await prisma.users.findUnique({
        where: {
          email: user?.email,
        },
      });

      if (dbUser) {
        return true;
      }

      await prisma.users
        .create({
          data: {
            id: user?.id,
            username: user?.name || '',
            email: user?.email || '',
            password: 'nopass',
            image: user?.image || '',
            provider: account?.provider || '',
          },
        })
        .catch((error: any) => {
          console.log(error);
          return false;
        });

      return true;
    },
  },
};
