import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL
import { error, json } from '@sveltejs/kit';  // Importation des fonctions pour gérer les erreurs et les réponses JSON

// Fonction pour gérer les requêtes POST à l'endpoint updatepays
export async function POST({ request, locals }) {
    const body = await request.json();  // Extraction du corps de la requête au format JSON
    console.log("Request body received:", body);  
    const userId = locals.userid;  // Récupération de l'ID utilisateur depuis les locaux (données d'authentification)
    console.log("Received country update request:", body.pays);  
    console.log("User ID:", userId);  

    // Vérification si l'ID utilisateur est présent
    if (!userId) {
        console.error("No user ID provided");
        return error(400, "User ID is required");  
    }

    try {
        // Exécution de la requête SQL pour mettre à jour le pays de l'utilisateur dans la base de données
        const result = await mysqlDatabase.query(
            'UPDATE users SET pays = ? WHERE id = ?',
            [body.pays, userId]
        );
        console.log('Database update result:', result);  
        return json({ success: true });  
    } catch (err) {
        console.error('Error updating user country:', err);  
        return error(500, `Server error: ${err.message}`);  
    }
}
