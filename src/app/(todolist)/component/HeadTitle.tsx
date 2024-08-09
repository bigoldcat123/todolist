'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function HeadTitle() {
    const searchParam = useSearchParams()
    const pathName = usePathname()
    const [title,setTitle] = useState('')
    const [color,setColor] = useState('')
    useEffect(() => {
        if(pathName.startsWith('/tag')){
            const tagName = pathName.replace('/tag/','').replace('/tag','').split('/').filter(x=>x!=='')
            const exceptionName  = searchParam.get('exceptTagnames')?.split('-') ?? []
            const total = tagName.length + exceptionName?.length
            // console.log(exceptionName,tagName);
            // debugger
            if(total == 1){
                if(tagName.length == 1){
                    setTitle(decodeURIComponent(tagName[0]))
                }else{
                    setTitle(decodeURIComponent(exceptionName[0]))
                }
            }else{
                setTitle(total + '个标签')
            }
        }else{
            setTitle(searchParam.get('title') as string)
        }
        const bg = searchParam.get('bg')
        if(bg) {
            setColor(bg.replace('bg','text'))
        }else{
            setColor('text-blue-400')
        }
    },[pathName,searchParam])
    return (
        <div className={`${color}`}>
            {title}
            <div className=" text-blue-400"></div>
            <div className=" text-orange-400"></div>
            <div className=" text-red-400"></div>
        </div>
    )
}