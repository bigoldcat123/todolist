'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import Search from "./component/SideBars/Search"
import CategoryItem from "./component/SideBars/CategoryItem"
import today from '@/app/(todolist)/component/SideBars/today.svg'
import plan from '@/app/(todolist)/component/SideBars/plan.svg'
import all from '@/app/(todolist)/component/SideBars/all.svg'
import qi from '@/app/(todolist)/component/SideBars/qi.svg'
import wancheng from '@/app/(todolist)/component/SideBars/wancheng.svg'

import ListItem from "./component/SideBars/ListItem"
import Tag from "./component/SideBars/Tag"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AddListDialog from "./component/SideBars/AddListDialog"
import { Sys_List, Sys_list_detail } from "@/lib/mapper/list"
import { list_lists } from "@/lib/action"
export default function SideBar() {

    const [tagNames, setTagNames] = useState<string[]>([])
    const [exceptTagNames, setExceptTagNames] = useState<string[]>([])
    function handleClick(tagName: string) {

        if (tagName == '所有标签') {
            if (tagNames.includes(tagName)) {
                setTagNames([])
                setExceptTagNames([tagName])
                return
            }
            if (exceptTagNames.includes(tagName)) {
                setTagNames([tagName])
                setExceptTagNames([])
                return
            }
            setTagNames([tagName])
            setExceptTagNames([])
        } else {
            if (tagNames.includes('所有标签') || exceptTagNames.includes('所有标签')) {
                setTagNames([tagName])
                setExceptTagNames([])
                return
            }
            if (tagNames.includes(tagName)) {
                setTagNames(tagNames.filter((value) => value != tagName))
                setExceptTagNames([...exceptTagNames, tagName])
                return
            }
            if (exceptTagNames.includes(tagName)) {
                // debugger
                setExceptTagNames(exceptTagNames.filter((value) => value != tagName))
                if (tagNames.length == 0 && exceptTagNames.length == 1) {
                    setTagNames([...tagNames, tagName])
                }
                    
                return
            }
            setTagNames([...tagNames, tagName])
        }
    }
    const router = useRouter()
    const pathname = usePathname()
    const searchParam = useSearchParams()
    useEffect(() => {
        if (!pathname.startsWith('/tag')) {
            setTagNames([])
            setExceptTagNames([])
        } else {
            // debugger
            const path = pathname.replace('/tag/', '').replace('/tag', '')
            const tagNames = path.split('/')
            const v = tagNames.map(x => decodeURIComponent(x)).filter(x=>x!=='')
            setTagNames(v)
            setExceptTagNames(searchParam.get('exceptTagnames')?.split('-') || [])
        }
    }, [pathname])
    useEffect(() => {
        if(searchParam.get('refresh')) {
            console.log('do refresh as layout---------------------------');
            
        }
    },[searchParam])
    useEffect(() => {
        if (tagNames.length == 0 && exceptTagNames.length == 0) {
            return
        }
        const url = '/tag/' + tagNames.join('/')
        const queryParam = exceptTagNames.length > 0 ? `?exceptTagnames=${exceptTagNames.join('-')}` : ''
        router.push(url + queryParam)
    }, [tagNames, exceptTagNames])
    const [showAddListDialog, setShowAddListDialog] = useState(false)

    const [lists, setLists] = useState<Sys_list_detail[]>([])

    useEffect(() => {
        list_lists().then(res => {
            setLists(res)
        })
    }, [])
    return (
        <>
            <div className=" h-full bg-red-100 flex flex-col justify-between p-2">
                <div>
                    <div>
                        <Search></Search>
                    </div>
                    <div className=" mt-4 flex flex-wrap justify-between">
                        <CategoryItem href="/" bg="bg-blue-400" title="今天" icon={today} ></CategoryItem>
                        <CategoryItem href="/plan" bg="bg-red-400" title="计划" icon={plan} ></CategoryItem>
                        <CategoryItem href="/all" bg="bg-orange-400" title="全部" icon={all} ></CategoryItem>
                        <CategoryItem href="/flag" bg="bg-black" title="旗标" icon={qi} ></CategoryItem>
                        <CategoryItem href="/finish" bg="bg-gray-400" title="完成" icon={wancheng} ></CategoryItem>
                    </div>
                    <div className=" overflow-auto h-[280px] " style={{ scrollbarColor: 'rebeccapurple #fee2e2'}}>
                        <div className="text-gray-400 p-3 ">
                            <div className="  text-[0.65rem] mb-2 ">我的列表</div>
                            {lists.map(((value, index) => {
                                return <ListItem key={index} href={`/list/${value.id}`} count={value.count ?? 0} name={value.list_name ?? 'undefined'}></ListItem>
                            }))}
                        </div>
                        <div className="text-gray-400 p-3">
                            <div className="  text-[0.65rem] ">标签</div>
                            <div className=" flex flex-wrap text-[0.8rem]">
                                <Tag t={tagNames} e={exceptTagNames} onClick={handleClick} tagName="所有标签"></Tag>
                                <Tag t={tagNames} e={exceptTagNames} onClick={handleClick} tagName="考试"></Tag>
                                <Tag t={tagNames} e={exceptTagNames} onClick={handleClick} tagName="2"></Tag>
                                <Tag t={tagNames} e={exceptTagNames} onClick={handleClick} tagName="3"></Tag>
                                <Tag t={tagNames} e={exceptTagNames} onClick={handleClick} tagName="4"></Tag>
                                <Tag t={tagNames} e={exceptTagNames} onClick={handleClick} tagName="5"></Tag>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-[0.8rem]">
                    <button onClick={() => setShowAddListDialog(true)}>+ 添加列表</button>
                </div>
                {showAddListDialog && <AddListDialog onCancle={() => setShowAddListDialog(false)} onConfirm={() => {
                    setShowAddListDialog(false); list_lists().then(res => {
                        setLists(res)
                    })
                }}></AddListDialog>}
            </div>
        </>
    )
}