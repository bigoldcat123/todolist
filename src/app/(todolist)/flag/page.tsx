import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  //delay 1000
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const u =  await auth()
  
  return (
    <>
    <div>flag</div>
    {
      Array(100).fill(0).map((value,index) => {
        return <div key={index}>{index}</div>
      })
    }
    </>
  );
}
