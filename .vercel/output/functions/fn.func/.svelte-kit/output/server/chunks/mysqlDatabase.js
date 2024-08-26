import mysql from "mysql2/promise";
const pool = mysql.createPool({
  // //local
  // host: 'localhost',
  // user: 'root',
  // password: '',  
  // database: 'kick_league_db',
  // port: 3307,
  // remote
  host: "109.234.160.137",
  user: "uhti7837_fabio",
  password: "L9Ul__C!Fh1%",
  database: "uhti7837_fabio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const mysqlDatabase = {
  async query(sql, params) {
    const [results] = await pool.query(sql, params);
    return results;
  }
};
export {
  mysqlDatabase as m
};
