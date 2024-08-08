'use client'

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Search() {

    const [shouOutline, setShowOutline] = useState(false)
    const [shouCancel, setShowCancel] = useState(false)
    let fetchDataTimeout: undefined | NodeJS.Timeout = undefined
    const ipt= useRef<HTMLInputElement>(null)
    let callBackUrl = undefined
    function handleChange(iptValue: string) {
        if(iptValue === '') {
            setShowCancel(false)
        }else{
            setShowCancel(true)
        }
        if (fetchDataTimeout) {
            clearTimeout(fetchDataTimeout)
            fetchDataTimeout = undefined
        }
        fetchDataTimeout = setTimeout(() => {
            console.log('fetch');
        }, 700);
    }
    return (
        <div className={`${shouOutline && 'outline outline-4 outline-blue-300 '} flex text-sm bg-slate-100  rounded-md p-[4px]`}>
            <div>🔍</div>
            <div className="flex-1 px-1">
            <input onFocus={() => setShowOutline(true)}
                ref={ipt}
                onBlur={() => {setShowOutline(false);}}
                onChange={(e) => handleChange(e.target.value)}
                className=" w-full bg-slate-100 focus:outline-none"
                placeholder="搜索" type="text" />
            </div>

            {shouCancel && <div onClick={() => {ipt.current!.value = ''; setShowCancel(false)}}>❌</div>}
        </div>
    )
}