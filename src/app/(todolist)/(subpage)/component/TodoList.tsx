'use client'

import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import { useSearchParams } from "next/navigation"

export default function ({title,list}:{
    list:any[],
    title:string
}) {

    const [l,setL] = useState(list)
    const searchParam = useSearchParams()
    const [newForenoon, setNewForenoon] = useState(false)
    console.log('render todoList');
    useEffect(() => {
        if(searchParam.get('refresh')) {
            setL([...l,searchParam.get('refresh')])
            console.log('fetch new at todo list ---------------------');
            
        }
    },[searchParam])
    return (
        <div>
            <div onClick={() => setNewForenoon(true)}>
                {title}{l.length}
            </div>
            {(newForenoon && l.length == 0) && <TodoItem needFocus={true} isFlip={false}></TodoItem>}
            {l.map((x,index) => <TodoItem key={index}></TodoItem>)}
            {(l.length !== 0) && <TodoItem needFocus={false} isFlip={true}></TodoItem>}
        </div>
    )
}