import { ResultSetHeader, RowDataPacket } from "mysql2/promise"
import db from "../db"
export type Sys_Todo = {
    id?:number
    title?:string
    description?:string
    start_date?:Date
    start_time?:string
    user_id?:number
}
type Sys_Todo_q = Sys_Todo & RowDataPacket

export async function todo_add(todo:Sys_Todo) {
    const d = await db()
    console.log(todo);
    
    const [res] = await d.query<ResultSetHeader>('INSERT INTO sys_todo SET ?',todo)
    d.destroy()
    todo.id = res.insertId
    return todo
}

export async function todo_list(user_id:number) {
    console.log(user_id);
    
    const d = await db()
    const sql = `SELECT * FROM sys_todo where user_id = ?`
    const [res] = await d.query<Sys_Todo_q[]>(sql,user_id)
    d.destroy()
    return res
}