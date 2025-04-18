import NextAuth from 'next-auth';

import api from '@/lib/utils/api';

import authConfig from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  callbacks: {
    async signIn({ user, account }) {
      // Skip email verification check for OAuth
      if (account?.provider !== 'credentials') {
        return true;
      }
      console.log(user);
      return true;
    },
    async session({ token, session }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.tempEmail = token.tempEmail as string | null;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.token = token;
        session.user.provider = token.provider;
        session.user.access_token = token.accessToken;
      }

      return session;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and provider to the token right after signin

      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;

        // If you're integrating with a Django backend, you might want to
        // send the tokens to your backend here and get a session token back
        try {
          const response = (await api.post('/auth/social/token/', {
            provider: account.provider,
            access_token: account.access_token,
            id_token: account.id_token
          })) as any;

          if (response.ok) {
            const data = (await response.json()) as any;
            token.backendToken = data.token;
          }
        } catch (error) {
          console.error('Error exchanging token with backend:', error);
        }
      }
      return token;
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig
});
