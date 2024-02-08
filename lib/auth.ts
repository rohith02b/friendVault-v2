import { NextAuthOptions, User, getServerSession } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await prisma.users.findFirst({
          where: { email: credentials.email },
        });

        if (dbUser?.provider === 'google') {
          return null;
        }

        if (dbUser && dbUser.password === credentials.password) {
          const { password, ...dbUserWithoutPassword } = dbUser;
          return dbUserWithoutPassword as User;
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'credentials') {
        return true;
      }
      const dbUser = await prisma.users.findUnique({
        where: {
          email: user?.email || '',
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
