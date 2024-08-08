import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListItem({href}:{href:string}) {
    const pathname = usePathname()
    return (
        <Link href={href} className=" ">
            <div className={`${pathname == href && 'bg-slate-200'} rounded-md text-[0.8rem] flex justify-between px-2 py-2`}>
                <div className=" flex">
                    <div className="w-5 aspect-square bg-blue-600 rounded-full mr-2">e</div>
                    <div>提醒事项</div>
                </div>
                <div>
                    3
                </div>
            </div>
        </Link>

    )
}