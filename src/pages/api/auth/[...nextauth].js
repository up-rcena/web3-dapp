import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import Moralis from 'moralis';

const { NEXTAUTH_SECRET, MORALIS_API_KEY } = process.env

export default NextAuth({
  secret: NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'MoralisAuth',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          // "message" and "signature" are needed for authorisation
          // we described them in "credentials" above
          const { message, signature } = credentials;

          await Moralis.start({ apiKey: MORALIS_API_KEY });

          const { address, profileId } = (
            await Moralis.Auth.verify({ message, signature, network: 'evm' })
          ).raw;

          // returning the profile object and creating  a session
          return { address, profileId, signature };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  // adding profile info to the profile session object
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});