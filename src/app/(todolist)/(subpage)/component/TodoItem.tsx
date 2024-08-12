'use client'

import { useActionState, useEffect, useRef, useState } from "react"
import TimePicker from "../../component/TimePicker"
import { addTodo } from "@/lib/action";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TodoItem ({isFlip=false,needFocus=false}:{
    isFlip?:boolean,
    needFocus?:boolean
}) {
    console.log('render todo item');
    
    const [flip, setFlip] = useState(isFlip)
    const item = useRef<HTMLDivElement>(null)
    const titleIpn = useRef<HTMLInputElement>(null)
    const form = useRef<HTMLFormElement>(null)
    const [res,action,pending] = useActionState(addTodo,{})
    const router = useRouter()
    const searchParam = useSearchParams()
    const params = new URLSearchParams(searchParam.toString())
    const pathName = usePathname()
    
    useEffect(() => {
    
        if(res.id) {
            params.set('refresh',res.id.toString())
            router.replace(pathName + '?' + params.toString())
        }       
    },[res])
    function submit(e:MouseEvent) {
        const target = e.target as HTMLElement
        console.log(target);
        
        if(!item.current?.contains(target)){
            if(isFlip)
                setFlip(true)

            console.log('do submit');
            window.removeEventListener('click',submit)
            form.current?.requestSubmit()
        }
    }
    function addCloseEventListerner(){
        window.addEventListener('click',submit)
    }
    function showItem() {
        
        addCloseEventListerner()
        if(!flip) return
        titleIpn.current?.focus()
        setFlip(false)
    }
    useEffect(() => {
        
        if(needFocus){
            titleIpn.current?.focus()
            setTimeout(() => {
                addCloseEventListerner()
            }, 300);
            
        }
        return () => {
            window.removeEventListener('click',submit)
        }
        
    },[])

    return (
        <div ref={item} className={`${flip && 'max-h-7 overflow-hidden'}  flex `}>
            <div>
               
                <div  onClick={showItem}  className=" w-5 aspect-square mr-2 bg-blue-300 rounded-full"></div>
            </div>
            <div>
                <form ref={form} action={action}>
                    <div>
                        <input ref={titleIpn} onClick={showItem} className=" focus:outline-none" type="text"  name="title" id="" />
                    </div>
                    <div>
                        <input className=" focus:outline-none" type="text" placeholder="备注" name="description" id="" />
                    </div>
                    <div>
                        <input className=" focus:outline-none" type="text" placeholder="添加标签" name="" id="" />
                    </div>
                    <div className=" flex">
                        <div>
                        <TimePicker  name="start_date"></TimePicker>
                        </div>
                        <div>
                            <input name="start_time"  className="w-16" type="text" placeholder="时间" />
                        </div>
                        <div>
                            <input name="location" className="w-16" type="text" placeholder="位置" />
                        </div>
                        <div>
                            <button>#</button>
                        </div>
                        <div>
                           flag
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}