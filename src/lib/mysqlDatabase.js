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
    host: 'localhost',
    user: 'uhti7837_fabio',
    password: 'L9Ul__C!Fh1%',
    database: 'uhti7837_fabio',
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
