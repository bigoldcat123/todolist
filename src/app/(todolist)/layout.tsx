import { auth, signOut } from "@/auth";
import Image from "next/image"
export default async function Layout({ children }: { children: React.ReactNode }) {


    const user = (await auth())?.user
    return <>

        <div className=" h-full flex">
            <div className=" w-52 text-xl text-red-500 font-m">this is the damn header</div>
            <div className="  flex-1 flex flex-col">
                <div className="min-h-24  flex justify-end">
                    <div>{user?.name}</div>
                    <form action={async (formdata) => {
                        'use server'
                        await signOut()
                    }}>
                        <button className=" font-edu text-xl" type="submit">Sign out</button>
                    </form>
                    <div className=" relative w-12 h-12">
                        <Image src={user?.image as string} alt='' fill></Image>
                    </div>
                </div>
                <div className=" flex-1">
                    {children}
                </div>
            </div>
        </div>
    </>;
}