import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { NextResponse } from "next/server";
import { createNewUserByGithubId, getUserByEmail, getUserByGithubId } from "./lib/mapper/user";
import github from "next-auth/providers/github";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address?: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        try{
          const user = await getUserByEmail(credentials.email as string)
          if (user.password !== credentials.password) {
            throw new CredentialsSignin('密码错误')
          }
          return {
            id: user.id?.toString(),
            name: user.name,
            email: user.email,
            image: user.picture,
          }
        }catch(e){
          throw new CredentialsSignin('预料之外的事情发生了')
        }
      },
    }),
    github
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      console.log(request.nextUrl.pathname);
      if (!!auth?.user && request.nextUrl.pathname === '/signin') {
        return NextResponse.redirect(new URL('/', request.url))
      }
      return !!auth?.user
    },
    session: async ({ session, token, user }) => {
      session.user.id = token.sub as string
      session.user.address = 'hei hei'
      return session
    },
    jwt: async ({ token, user, account, profile, trigger }) => {
      if (trigger == 'signIn' && profile) {
        const u = await getUserByGithubId(profile?.id as string)
        if (u) {
          token.sub = u.id?.toString()
        } else {
          const u = await createNewUserByGithubId({
            'github_id': profile?.id as string,
            'name': profile?.name as string,
            'email': profile?.email as string,
            'create_time':new Date(),
            'picture':profile?.avatar_url as string
          })
          token.sub = u!.id?.toString()
        }
      }
      return token
    }
  }
})