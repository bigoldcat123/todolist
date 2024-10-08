import { auth, signOut } from "@/auth";
import Image from "next/image"
import Link from "next/link";
import SideBar from "./SideBar";
import HeadTitle from "./component/HeadTitle";
export default async function Layout({ children }: { children: React.ReactNode }) {


    const user = (await auth())?.user

    return <>

        <div className=" h-full flex">
            <div className=" w-[17.5rem]">
                <SideBar></SideBar>
            </div>
            <div className="  flex-1 flex flex-col">
                <div className="min-h-[4rem]  flex justify-between items-center border-b-2 border-gray-300">
                    <div className=" px-2 font-edu font-extrabold text-3xl"><HeadTitle></HeadTitle></div>
                    <div className=" flex">
                        <div>
                            <div>{user?.name}</div>
                            <form action={async (formdata) => {
                                'use server'
                                await signOut()
                            }}>
                                <button className=" font-edu text-xl" type="submit">Sign out</button>
                            </form>
                        </div>

                        <div className=" relative w-12 h-12">
                            <Image src={user?.image as string} alt='' fill></Image>
                        </div>
                    </div>

                </div>
                <div className=" flex-1 p-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    </>;
}