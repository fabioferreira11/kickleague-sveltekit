import { mysqlDatabase } from '$lib/mysqlDatabase.js'; // Importation de la connexion à la base de données MySQL

// Fonction pour gérer les requêtes POST à l'endpoint checkIfPackOpened
export async function POST({ request }) {
    try {
        // Extraction du corps de la requête pour obtenir l'ID de l'utilisateur
        const body = await request.json();
        const userId = body.userId;

        // Requête SQL pour vérifier si l'utilisateur a déjà ouvert un pack
        const query = `SELECT opened FROM user_packs WHERE user_id = ?;`;
        const results = await mysqlDatabase.query(query, [userId]);

        console.log("DB Query Results:", results); 

        // Si aucun pack n'est trouvé pour l'utilisateur, retourner que le pack n'est pas ouvert
        if (results.length === 0) {
            console.log("No pack data found for user:", userId);  // Log si aucune donnée de pack n'est trouvée
            return new Response(JSON.stringify({ opened: false }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            });
        }

        // Vérification si le champ 'opened' est égal à 1 (ce qui signifie que le pack est ouvert)
        const isOpened = Number(results[0].opened) === 1;
        console.log("Pack opened status for user:", userId, isOpened);  

        // Retourne le statut du pack (ouvert ou non) en réponse JSON
        return new Response(JSON.stringify({ opened: isOpened }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        // Gestion des erreurs : log de l'erreur et retour d'une réponse d'erreur 500
        console.error('Error checking pack opened status:', error);
        return new Response(JSON.stringify({ error: 'Failed to check pack status' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}