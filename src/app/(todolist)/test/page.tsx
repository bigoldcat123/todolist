import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const u =  await auth()
  
  return (
    <>
    <div>this is test</div>
    {
      Array(100).fill(0).map((value,index) => {
        return <div key={index}>{index}</div>
      })
    }
    </>
  );
}
