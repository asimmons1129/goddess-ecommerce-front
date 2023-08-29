import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { redirect } from 'next/dist/server/api-utils';
import clientPromise from '../../../lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'


export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async redirect({ url }){
        if(url.includes("/login")) return "/";
        if(!url.includes("/")) return "/login";
        return url;
    },
  },
};

export default NextAuth(authOptions);