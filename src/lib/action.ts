'use server'

import { auth, signIn } from "@/auth"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"

export async function getMyInformation() {
    const information = await auth()
    console.log(information);
    
    return information?.user
}

export async function signin(init: { message: string, callbackUrl: string | null }, formdata: FormData) {
    try {
        console.log('calbackurl', init);
        console.log('calbackurl', init.callbackUrl);

        await new Promise((resolve) => setTimeout(resolve, 1000))

        await signIn('credentials', formdata)
    } catch (error) {
        if (error instanceof CredentialsSignin) {
            // console.log(error.message);
            return {
                message: '用户名或密码错误 ❌ ',
                callbackUrl: init.callbackUrl
            }
        }
    }
   
    return await redirect(init.callbackUrl ?? '/')
}
export async function SigninWithGitHub() {
        await signIn('github')
}