// Helper to safely access environment variables
// const getEnvVar = (key: string): string => {
//   const value = process.env[key];
//   if (!value) {
//     console.warn(`Missing environment variable: ${key}`);
//     return '';
//   }
//   return value;
// };

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: getEnvVar('GOOGLE_CLIENT_ID'),
//       clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET')
//     }),
//     FacebookProvider({
//       clientId: getEnvVar('FACEBOOK_CLIENT_ID'),
//       clientSecret: getEnvVar('FACEBOOK_CLIENT_SECRET')
//     }),
//     TwitterProvider({
//       clientId: getEnvVar('TWITTER_CLIENT_ID'),
//       clientSecret: getEnvVar('TWITTER_CLIENT_SECRET')
//     })
//   ],
//   callbacks: {
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token and provider to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token;
//         token.provider = account.provider;

//         // Comment out backend integration for now to simplify debugging
//         // Will re-enable after fixing NextAuth session errors
//         /*
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
//         const tokenEndpoint = `${apiUrl}/api/auth/token/`;

//         try {
//           const response = await fetch(tokenEndpoint, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               provider: account.provider,
//               access_token: account.access_token,
//               id_token: account.id_token
//             })
//           });

//           if (response.ok) {
//             const data = (await response.json()) as { token: string };
//             token.backendToken = data.token;
//           } else {
//             console.error('Failed to exchange token with backend:', await response.text());
//           }
//         } catch (error) {
//           console.error('Error exchanging token with backend:', error);
//         }
//         */
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.provider = token.provider;
//       // session.backendToken = token.backendToken;
//       return session;
//     }
//   },
//   pages: {
//     signIn: '/',
//     error: '/auth/error'
//   },
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60 // 30 days
//   },
//   secret: getEnvVar('NEXTAUTH_SECRET'),
//   debug: process.env.NODE_ENV === 'development'
// });

// export { handler as GET, handler as POST };

export { GET, POST } from 'auth';
