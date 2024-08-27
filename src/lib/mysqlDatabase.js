import mysql from 'mysql2/promise'; 

// Configuration de la connexion à la base de données
const pool = mysql.createPool({
    // //local
    // host: 'localhost',
    // user: 'root',
    // password: '',  
    // database: 'kick_league_db',
    // port: 3307,
    // remote
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export de l'objet pool pour être utilisé dans d'autres fichiers
export const mysqlDatabase = {
    async query(sql, params) {
        const [results, ] = await pool.query(sql, params);
        return results;
    }
};
