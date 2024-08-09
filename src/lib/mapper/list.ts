import { ResultSetHeader, RowDataPacket } from "mysql2"
import db from "../db"

export type Sys_List = {
    id?: number
    list_name?: string
    user_id?: number
}
type Sys_List_q = Sys_List & RowDataPacket
const tableName = 'sys_list'

export async function list_add(list: Sys_List) {
    const d = await db()
    const sql = `INSERT INTO ${tableName} SET ?`
    const [res] = await d.query<ResultSetHeader>(sql, list)
    d.destroy()
    return res
}

export async function list_list(user_id: number) {
    const d = await db()
    const sql = `SELECT * FROM ${tableName} where user_id = ?`
    const [res] = await d.query<Sys_List_q[]>(sql, user_id)
    d.destroy()
    return res
}

export type Sys_list_detail ={
    id?:number
    list_name?:string
    count?:number
} 
type Sys_list_detail_q = Sys_list_detail & RowDataPacket
export async function list_lists_detail(user_id: number) {
    const d = await db()
    const sql = `SELECT l.id, 
                l.list_name, 
                COUNT(t.list_id) as count
                FROM 
                ${tableName} as l
                LEFT JOIN 
                sys_todo as t 
                ON 
                l.id = t.list_id AND t.user_id = ?
                GROUP BY 
                l.id, l.list_name`
    // const sql = `SELECT * FROM ${tableName} where user_id = ?`
    const [res] = await d.query<Sys_list_detail_q[]>(sql, user_id)
    d.destroy()
    return res
}