import mysql from 'mysql2/promise';

export default async () => {
  return await mysql.createConnection({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    database: process.env.mysql_database,
    password: process.env.mysql_password,
  });
}
