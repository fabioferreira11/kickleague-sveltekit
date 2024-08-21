import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL
import { error, json } from '@sveltejs/kit';  // Importation des fonctions pour gérer les erreurs et les réponses JSON

// Fonction pour gérer les requêtes POST à l'endpoint updateclub
export async function POST({ request, locals }) {
    const { club } = await request.json();  
    const userId = locals.userid;  

    // Vérification si l'ID utilisateur est présent
    if (!userId) {
        console.error("No user ID provided");
        return error(400, "User ID is required");  
    }

    try {
        // Exécution de la requête SQL pour mettre à jour le club de l'utilisateur dans la base de données
        const result = await mysqlDatabase.query(
            'UPDATE users SET club = ? WHERE id = ?',
            [club, userId]
        );
        console.log('Database update result:', result);  
        return json({ success: true });  
    } catch (err) {
        console.error('Error updating user club:', err);  
        return error(500, `Server error: ${err.message}`);  
    }
}
