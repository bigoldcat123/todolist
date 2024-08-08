import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function CategoryItem({
    icon,
    title,
    bg,
    href
}: {
    icon: any,
    title: string,
    bg: string,
    href: string
}) {
    const pathName = usePathname()
    return (
        <div className={`pb-2 h-[4.5rem] ${pathName == href && ' text-white '}`} style={{ flex: '0 0 calc(100% / 2.06)' }}>
            <Link href={href}>
                <div className={`${pathName !== href ? 'bg-gray-300 ' : `${bg}`} rounded-lg h-full  flex p-2 justify-between`}>
                    <div className=' flex flex-col justify-between'>
                        <div className={`${pathName == href ? 'bg-white' : `${bg}`}  w-7  aspect-square rounded-full flex items-center justify-center`}>
                            <Image src={icon} alt='' width={20} height={20}></Image></div>
                        <div className=' text-center text-[0.8rem] font-chinese '>
                            {title}
                        </div>
                    </div>
                    <div className=' text-xl font-chinese font-bold'>
                        3
                    </div>
                </div>
            </Link>

        </div>
    )
}