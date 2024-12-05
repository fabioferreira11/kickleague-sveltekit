import { error, json } from '@sveltejs/kit'; // Gestion des réponses d'erreur et JSON
import { mysqlDatabase } from '$lib/mysqlDatabase'; // Connexion à la base de données MySQL
import { synchronizePlayers } from '$lib/api'; // Importation de la fonction de synchronisation
import redisClient from '$lib/redisClient'; // Importation du client Redis

export async function POST({ request }) {
    const { userId } = await request.json();

    console.log(`Preparing data for user: ${userId}`);

    try {
        // Étape 1 : Vérifier si l'utilisateur existe
        const userDetails = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        if (userDetails.length === 0) {
            return error(404, "User not found");
        }

        const { club, pays } = userDetails[0];

        // Étape 2 : Synchroniser les joueurs si nécessaire
        await synchronizePlayers(new Date().getFullYear());

        // Étape 3 : Stocker les informations utilisateur dans une base temporaire (cache)
        await redisClient.set(`user_${userId}_details`, JSON.stringify({ club, pays }), {
            EX: 3600, // Expire en 1 heure
        });

        return json({ message: "User data prepared successfully" });
    } catch (err) {
        console.error("Error preparing data for user:", err);
        return error(500, "Internal Server Error");
    }
}