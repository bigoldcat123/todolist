'use client'
import Image from "next/image";
import Link from "next/link";
import TimePicker from "./component/TimePicker";
import { submit, todolist } from "@/lib/action";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { Sys_Todo } from "@/lib/mapper/todo";
import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import moment from "moment";

function Tip() {
  return (
    <div className=" absolute bg-red-200 w-11 aspect-square top-0 left-[50%] ">
      添加成功
    </div>
  )
}
function useMessage(): [React.Dispatch<React.SetStateAction<boolean>>, () => React.JSX.Element] {

  const [show, setShow] = useState(false)
  function Tip() {

    return (
      <>      {show && ReactDOM.createPortal(<div className=" absolute bg-red-200 w-11 aspect-square top-0 left-[50%] ">
        添加成功
      </div>, document.body)}
      </>

    )
  }
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        (setShow)(false)
      }, 1000);
    }

  }, [show])
  return [setShow, Tip]
}
export default function Home() {
  const [init, action, pending] = useActionState(submit, {})
  const [list, setList] = useState<Sys_Todo[]>([])
  useEffect(() => {
    todolist().then(res => {
      setList(res)
    })
  }, [])
  const [setShow, T] = useMessage()
  useEffect(() => {
    if (init.id) {
      debugger
      (setShow)(true)
      setList(Array.of(...list, init))
    }
  }, [init])
  const [currentEdit, setCurrentEdit] = useState(-9)
  return (
    <>
      <ul className=" list-disc">
        {
          list.map((x, index) =>
            <li key={index} className="">
              <form>
                <div>
                  <input type="text"  onFocus={() => setCurrentEdit(x.id as number)} name="title" defaultValue={x.title} placeholder="title" className=" focus:outline-none bg-background" />
                </div>
                <div>
                  {(x.description || currentEdit == x.id) && <input  type="text" name="des" defaultValue={x.description} placeholder="description" className=" focus:outline-none bg-background" />}
                </div>
                <div className=" flex">
                  {(x.start_date || currentEdit == x.id )&& <TimePicker value={x.start_date && moment(x.start_date).format('yyyy-MM-DD')} name="date"></TimePicker>}
                  <div>
                    {(x.start_time || currentEdit == x.id )&& <input defaultValue={x.start_time} className=" bg-background" name="time" type='time' />}
                  </div>
                </div>
                <input type="hidden" name="id" defaultValue={x.id} />
                {currentEdit == x.id && <button className=" bg-slate-600">subbmit</button>}
              </form>
              <hr />
            </li>)
        }
        <li className="">
          <form action={action}>
            <div>
              <input type="text" name="title" placeholder="title" className=" focus:outline-none bg-background" />
            </div>
            <div>
              <input type="text" name="des" placeholder="description" className=" focus:outline-none bg-background" />
            </div>
            <div className=" flex">
              <div>
                <TimePicker name="date"></TimePicker></div> <div><input placeholder="pick a time" className=" bg-background" name="time" type='time' />
              </div>
            </div>
            <button>subbmit</button>
          </form>
        </li>
      </ul>
      {/* {init.id && ReactDOM.createPortal(<Tip></Tip>, document.body)} */}
      <T></T>
    </>
  );
}
