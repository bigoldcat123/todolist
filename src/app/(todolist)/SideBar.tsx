'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideBar() {
    const menuList = [{
        name: 'home',
        path: '/',
    },
    {
        name: 'test',
        path: '/test',
    },
]
const pathname = usePathname()
    return (
        <>
            {menuList.map((item, index) => {
                return <div className={`${pathname == item.path && ' bg-green-900 border-b-2 '} mb-2 text-2xl text-center font-edu hover:border-b-2`} key={index}><Link href={item.path}>{item.name}</Link></div>
            })}</>
    )
}