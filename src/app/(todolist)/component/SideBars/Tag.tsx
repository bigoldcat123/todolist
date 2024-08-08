import { useEffect, useState } from "react"

export default function Tag({tagName,onClick,t,e}:
    {tagName:string,
        onClick:(tagName:string)=>void,
        t:string[],
        e:string[]}) {
    return (
        <div className={` ${ (!t.includes(tagName)&&!e.includes(tagName)) && 'bg-gray-100 ' } ${t.includes(tagName) && 'bg-blue-700 '} ${e.includes(tagName) && 'bg-black '} py-1 px-2 mt-2 rounded-lg mr-2 `}>
            <button onClick={() => {onClick(tagName)}}  >#{tagName}{t.includes(tagName) && '✔'}{e.includes(tagName) && '✘'}</button>
        </div>
    )
}