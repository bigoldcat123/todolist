import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListItem({
    href,
    name,
    count
}:
    {
        href:string,
        name:string,
        count:number
    }) {
    const pathname = usePathname()
    return (
        <Link href={href + `?title=${name}&bg=bg-blue-400`} className=" ">
            <div className={`${pathname == href && 'bg-slate-200'} rounded-md text-[0.8rem] flex justify-between px-2 py-2`}>
                <div className=" flex">
                    <div className="w-5 aspect-square bg-blue-600 rounded-full mr-2">e</div>
                    <div>{name}</div>
                </div>
                <div>
                    {count}
                </div>
            </div>
        </Link>

    )
}