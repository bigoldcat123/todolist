'use client'
import { useEffect, useRef, useState } from "react"

function getFirstDayOfWeek(year: number, month: number) {
    const date = new Date(year, month - 1, 1);
    const dayOfWeek = date.getDay();
    return dayOfWeek == 0 ? 7 : dayOfWeek;
}
function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}
function DateItem({ day, type, onPick }: { day: number, type: 'post' | 'pre' | 'current', onPick: (date: number, type: 'post' | 'pre' | 'current') => void }) {
    return (
        <div onClick={() => onPick(day, type)} className={`${(type !== 'current') && ' text-gray-400'}  text-center mb-1 cursor-pointer`} style={{ flex: '0 0 calc(100% / 7)' }} >{day}</div>
    )
}
export default function TimePicker() {
    const currentdate = new Date()
    const [showPicker, setShowPicker] = useState(false)
    const [year, setYear] = useState(currentdate.getFullYear())
    const [month, setMonth] = useState(currentdate.getMonth() + 1)
    const [firstDay, setFirstDay] = useState(getFirstDayOfWeek(year, month))

    const [preMonthDays, setPreMonthDays] = useState(getDaysInMonth(year, month - 1))
    const [days, setDays] = useState(getDaysInMonth(year, month))
    const [postMonthDays, setPostMonthDays] = useState(42 - days - firstDay + 1)
    const picker = useRef<HTMLDivElement>(null)
    const ipt = useRef<HTMLInputElement>(null)

    
    useEffect(() => {
        setDays(getDaysInMonth(year, month))
        setFirstDay(getFirstDayOfWeek(year, month))
        setPreMonthDays(getDaysInMonth(year, month - 1))
    }, [month,year])

    useEffect(() => {
        const s = 42 - days - firstDay + 1
        setPostMonthDays(s)
    },[days,firstDay])
    useEffect(() => {
        const fun = (e: MouseEvent) => {

            const t = e.target as HTMLDivElement
            if (!picker.current?.contains(t) && t !== ipt.current) {
                setShowPicker(false)
            }

        }
        window.addEventListener('click', fun)
        return () => {
            window.removeEventListener('click', fun)
        }
    }, [])

    function handlePick(date: number, type: 'post' | 'pre' | 'current') {
        let m = month
        switch (type) {
            case 'post':
                m++
                break;
            case 'pre':
                m--
                break;
            case 'current':
                break;
        }
        console.log(year, m, date);
        ipt.current!.value = `${year}-${m }-${date}`
        setShowPicker(false)
    }
    return (
        <>
            <div className=" relative">
                <div><input ref={ipt} onFocus={() => setShowPicker(true)} type="text" placeholder="time" className=" bg-background focus:outline-none" /></div>
                {showPicker && <div ref={picker} className=' absolute w-72 bg-foreground text-background  '>
                    <div>
                        <button onClick={() => setYear(year - 1)}>year--</button>
                        <button onClick={() => {setMonth(month - 1 == 0 ? 12 : month - 1);month - 1 == 0&&setYear(year - 1)}}>month--</button>
                        {year} {month}
                        <button onClick={() => {(setMonth(month + 1 == 13 ? 1 : month + 1));month + 1 == 13&&setYear(year + 1)}}>month++</button>
                        <button onClick={() => setYear(year + 1)} >year++</button>
                    </div>
                    <div className=" ">
                        <div className="flex border-b-2">
                            {Array(7).fill(0).map((_, index) => <div className=" flex-1 text-center" key={index}>{index + 1}</div>)}
                        </div>
                        <div className=" py-2 flex flex-wrap ">
                            {Array(firstDay - 1).fill(0).map((_, index) => <DateItem onPick={handlePick} type="pre" key={index} day={preMonthDays - firstDay + index + 2}></DateItem>)}
                            {Array(days).fill(0).map((_, index) => <DateItem onPick={handlePick} type="current" key={index} day={index + 1}></DateItem>)}
                            {Array(postMonthDays).fill(0).map((_, index) => <DateItem onPick={handlePick} type="post" key={index} day={index + 1}></DateItem>)}
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}