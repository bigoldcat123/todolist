import db from "@/lib/db"
import { Sys_User } from "@/lib/mapper/user"
import { NextResponse } from "next/server"

export async function GET() {
    const d = await db()
    await d.beginTransaction()
    const user  = {
        'name':'1'
    }
    await d.query('insert into sys_user set ?',user)

    await d.commit()
    return NextResponse.json("666")
}