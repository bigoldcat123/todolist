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
function DateItem({ day, type, onPick, active }: { active?: boolean, day: number, type: 'post' | 'pre' | 'current', onPick: (date: number, type: 'post' | 'pre' | 'current') => void }) {
    return (
        <div onClick={() => onPick(day, type)} className={` ${active && ' bg-green-900 text-white '}  ${(type !== 'current') && ' text-gray-400'}  text-center mb-1 cursor-pointer`} style={{ flex: '0 0 calc(100% / 7)' }} >{day}</div>
    )
}
export default function TimePicker({ name, value }: { name?: string, value?: string }) {
    const currentdate = new Date()
    const [showPicker, setShowPicker] = useState(false)
    const [year, setYear] = useState(currentdate.getFullYear())
    const [month, setMonth] = useState(currentdate.getMonth() + 1)

    const [dateS, setDateS] = useState(0)
    const [yearS, setYearS] = useState(currentdate.getFullYear())
    const [monthS, setMonthS] = useState(currentdate.getMonth() + 1)


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
    }, [month, year])

    useEffect(() => {
        const s = 42 - days - firstDay + 1
        setPostMonthDays(s)
    }, [days, firstDay])
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
    useEffect(() => {
        if(dateS != 0)
        ipt.current!.value = `${year}-${month}-${dateS}`
    }, [dateS])
    function handlePick(date: number, type: 'post' | 'pre' | 'current') {
        let m = month
        switch (type) {
            case 'post':
                m++
                if (m == 13) {
                    m = 1
                    setYearS(year + 1)
                    setYear(year + 1)
                }
                break;
            case 'pre':
                m--
                if (m == 0) {
                    m = 12
                    setYearS(year - 1)
                    setYear(year - 1)
                }
                break;
            case 'current':
                setYearS(year)
                break;
        }
        console.log(year, m, date);
        setMonthS(m)
        setMonth(m)
        setDateS(date)
        // setShowPicker(false)
    }
    function isCurrentDate(_year: number, _month: number, _date: number) {
        return yearS == _year && monthS == _month && dateS == _date
    }
    return (
        <>
            <div className=" relative">
                <div><input ref={ipt} onFocus={() => setShowPicker(true)} type="text" placeholder="pick a date" defaultValue={value} name={name} className=" bg-background focus:outline-none" /></div>
                {showPicker && <div ref={picker} className='  z-50 absolute w-72 bg-foreground text-background  '>
                    <div className="flex justify-between">
                        <div className=" ml-3">
                            <button className=" mx-1" onClick={() => setYear(year - 1)}>《</button>
                            <button className=" mx-1" onClick={() => { setMonth(month - 1 == 0 ? 12 : month - 1); month - 1 == 0 && setYear(year - 1) }}>{'<'}</button>
                        </div>

                        {year} - {month}
                        <div className=" mr-3">
                            <button className=" mx-1" onClick={() => { (setMonth(month + 1 == 13 ? 1 : month + 1)); month + 1 == 13 && setYear(year + 1) }}>{'>'}</button>
                            <button className=" mx-1" onClick={() => setYear(year + 1)} >》</button>
                        </div>

                    </div>
                    <div className=" ">
                        <div className="flex border-b-2">
                            {Array(7).fill(0).map((_, index) => <div className=" flex-1 text-center" key={index}>{index + 1}</div>)}
                        </div>
                        <div className=" py-2 flex flex-wrap ">
                            {Array(firstDay - 1).fill(0).map((_, index) => <DateItem onPick={handlePick} type="pre" key={index} day={preMonthDays - firstDay + index + 2}></DateItem>)}
                            {Array(days).fill(0).map((_, index) => <DateItem active={isCurrentDate(year, month, index + 1)} onPick={handlePick} type="current" key={index} day={index + 1}></DateItem>)}
                            {Array(postMonthDays).fill(0).map((_, index) => <DateItem onPick={handlePick} type="post" key={index} day={index + 1}></DateItem>)}
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}