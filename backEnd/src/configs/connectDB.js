import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'library_pro_max',
  password: ''
})

const connection = pool.promise()
export default connection
