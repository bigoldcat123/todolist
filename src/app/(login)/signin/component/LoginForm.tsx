'use client'

import { signin, SigninWithGitHub } from "@/lib/action";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import login from './login.jpg'
export default function Loginfor({ callbackUrl }: { callbackUrl: string | null }) {
    console.log(callbackUrl);

    const [init, action, ispending] = useActionState(signin, { message: 'e', callbackUrl: callbackUrl })
    useEffect(() => {

    },[])
    return (
        <>
            {ispending &&
                <div className=" absolute backdrop-blur-sm flex justify-center  w-screen h-screen bg-white/30">
                {/* <svg className=" animate-spin"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1549" width="200" height="200"><path d="M144.205 202.496a136.678 136.678 0 1 0 273.357 0 136.678 136.678 0 1 0-273.357 0zM41.728 492.902a119.578 119.578 0 1 0 239.155 0 119.578 119.578 0 1 0-239.155 0zM144.23 749.158a102.502 102.502 0 1 0 205.005 0 102.502 102.502 0 1 0-205.005 0zM435.2 861.926a89.6 89.6 0 1 0 179.2 0 89.6 89.6 0 1 0-179.2 0z m289.843-95.666a85.427 85.427 0 1 0 170.855 0 85.427 85.427 0 1 0-170.855 0z m136.704-290.433a68.326 68.326 0 1 0 136.653 0 68.326 68.326 0 1 0-136.653 0zM759.22 219.571a51.251 51.251 0 1 0 102.502 0 51.251 51.251 0 1 0-102.503 0zM512 85.376a34.176 34.176 0 1 0 68.352 0 34.176 34.176 0 1 0-68.352 0z" p-id="1550"></path></svg> */}
                <div>
                <svg className=" animate-spin"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1549" width="40" height="40"><path d="M144.205 202.496a136.678 136.678 0 1 0 273.357 0 136.678 136.678 0 1 0-273.357 0zM41.728 492.902a119.578 119.578 0 1 0 239.155 0 119.578 119.578 0 1 0-239.155 0zM144.23 749.158a102.502 102.502 0 1 0 205.005 0 102.502 102.502 0 1 0-205.005 0zM435.2 861.926a89.6 89.6 0 1 0 179.2 0 89.6 89.6 0 1 0-179.2 0z m289.843-95.666a85.427 85.427 0 1 0 170.855 0 85.427 85.427 0 1 0-170.855 0z m136.704-290.433a68.326 68.326 0 1 0 136.653 0 68.326 68.326 0 1 0-136.653 0zM759.22 219.571a51.251 51.251 0 1 0 102.502 0 51.251 51.251 0 1 0-102.503 0zM512 85.376a34.176 34.176 0 1 0 68.352 0 34.176 34.176 0 1 0-68.352 0z" p-id="1550"></path></svg>
登陆中...
                </div>
                </div>}
            <div className=" flex lg:w-[60rem] w-[30rem] h-[44rem] rounded-3xl overflow-hidden shadow-2xl">
                <div className=" w-[30rem] bg-slate-50 h-full flex flex-col justify-center items-center">
                    <div>binner</div>
                    <p className="my-8 text-4xl font-bold">Welcome Back</p>
                    <form className=" w-72   gap-y-3  flex flex-col" action={SigninWithGitHub}>
                        <button className="h-9 rounded-md text-white bg-purple-800 w-full text-center" type="submit">Login with GitHub</button>
                    </form>
                    <p className=" my-6 text-sm text-slate-400 font-mono">OR LOGIN WITH EMAIL</p>

                    <form className=" w-72   gap-y-3  flex flex-col" action={action}>
                        <div>
                            <input
                                className=" w-full h-9 shadow-lg rounded-md pl-2"
                                type="email"
                                name="email"
                                placeholder="email"
                                required
                            />
                        </div>
                        <div>
                            <input
                                className=" w-full h-9 shadow-lg rounded-md pl-2"
                                placeholder="password"
                                type="password"
                                name="password"
                                required
                                minLength={2}
                            />
                        </div>
                        <div>
                            记住我
                        </div>
                        <button className="h-9 rounded-md text-white bg-purple-800 w-full text-center " type="submit">Sign in</button>
                        <div className=" text-red-600 text-sm">
                            {init.message}
                        </div>
                    </form>
                </div>
                <div className=" lg:w-[30rem] w-0 h-full overflow-hidden">
                    <Image src={login} alt="login" ></Image>
                </div>
            </div>



        </>
    )
}