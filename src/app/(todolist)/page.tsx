import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const u =  await auth()
  
  return (
    <>
      <div>
        head -----
        {u?.user?.id} + {u?.user.name} + {u?.user?.email} + {u?.user.address}+{u?.user.image}
        <div className=" relative w-16 aspect-square">

        <Image src={u?.user?.image as string} alt="abc" fill></Image>
        </div>

      </div>
      <div>
        <Link className=" font-m" href={'/information'}>information</Link>
      </div>
    </>
  );
}
