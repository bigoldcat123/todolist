
import Image from "next/image";
import Link from "next/link";
import TimePicker from "./component/TimePicker";

export default function Home() {
  return (
    <>
      <ul className=" list-disc">
        <li className="">
          <form action="">
            <div>
              <input type="text" placeholder="title" className=" focus:outline-none bg-background" />
            </div>
            <div>des</div>
            <div className=" flex">
              <div> <input className=" bg-background" type='date' /></div> <div><input className=" bg-background" type='time' /></div>
            </div>
          </form>
        </li>
      </ul>
      <TimePicker></TimePicker>
    </>
  );
}
