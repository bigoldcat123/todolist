'use server'
import { Connection, OkPacketParams, ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../db";
 export type Sys_User  = {
    id?:number
    name?:string
    email?:string
    address?:string
    password?:string
    picture?:string,
    create_time?:Date,
    github_id?:string
} 
type Sys_User_q = Sys_User & RowDataPacket
export const getUserByEmail = async (email:string):Promise<Sys_User> => {
    const d = await db()
    const sql = `SELECT * FROM sys_user WHERE email = ?`
    const [res] = await d.query<Sys_User_q[]>(sql,[email])
    d.destroy()
    return res[0]
}
export const getUserByGithubId = async (githubId:string):Promise<Sys_User | null> => {
    const d = await db()
    const sql = `SELECT * FROM sys_user WHERE github_id = ?`
    const [res] = await d.query<RowDataPacket[]>(sql,[githubId])
    if(res.length == 0) {
        return null
    }
    d.destroy()
    return res[0] as Sys_User
}
export const createNewUserByGithubId = async (user:Sys_User):Promise<Sys_User> => {
    const d = await db()
    const sql = `INSERT INTO sys_user SET ?`
    const [res] = await d.query<ResultSetHeader>(sql,[user])
    user.id = res.insertId;
    d.destroy()
    return user
}