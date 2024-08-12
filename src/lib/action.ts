'use server'

import { auth, signIn } from "@/auth"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"
import db from "./db"
import { Sys_Todo, todo_add, todo_list } from "./mapper/todo"
import { list_add, list_list, list_lists_detail } from "./mapper/list"
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

export async function addTodo(init:Sys_Todo,formdata:FormData) {
    console.log(formdata);
    
    const x= {
        'start_time':!!formdata.get('time') ? formdata.get('time') as string : undefined,
        'start_date': !!formdata.get('date') ? new Date(formdata.get('date') as string) : undefined,
        'description': formdata.get('des') as string,
        'title': formdata.get('title') as string,
        'list_id':1,
        'user_id': Number.parseInt((await auth())?.user.id as string)
    }
   
   return (await todo_add(x));
   
}
export async function todolist(){
    return await todo_list(Number.parseInt((await auth())?.user.id as string))
} 

export async function list_lists() {
    return await list_lists_detail(await getCurrentUserId())
}
export async function add_lists(init:{message?:string},formData:FormData) {
    await list_add({
        'list_name':formData.get('list_name') as string,
        'user_id':await getCurrentUserId()
    })
    return {
        message:'ok'
    }
}

async function getCurrentUser(){
    return (await auth())?.user
}
async function getCurrentUserId(){
    return Number.parseInt((await auth())?.user.id as string)
}