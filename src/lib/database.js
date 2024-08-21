// Importation de la connexion à la base de données MySQL à partir du module $lib/mysqlDatabase
import { mysqlDatabase } from '$lib/mysqlDatabase';

// Fonction pour récupérer un utilisateur de la base de données en fonction de son ID
export async function getUserById(userId) {
    const sql = 'SELECT * FROM users WHERE id = ?'; 
    try {
        const user = await mysqlDatabase.query(sql, [userId]);
        return user.length ? user[0] : null;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}
