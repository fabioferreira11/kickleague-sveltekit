import { error, json } from '@sveltejs/kit'; // Gestion des réponses d'erreur et JSON
import { mysqlDatabase } from '$lib/mysqlDatabase'; // Connexion à la base de données MySQL
import { getPlayersFromPrimeiraLiga } from '$lib/api'; // Import de la fonction manquante
import redisClient from '$lib/redisClient'; // Importation du client Redis

// Fonction pour vérifier si un joueur existe déjà dans la base de données
async function ensurePlayerExists(player) {
    const existingPlayer = await mysqlDatabase.query('SELECT id FROM players WHERE id = ?', [player.player.id]);
    if (existingPlayer.length === 0) {
        await mysqlDatabase.query('INSERT INTO players (id, nom, photo_url, position, age, club, pays) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            player.player.id, 
            player.player.name, 
            player.player.photo, 
            player.statistics[0].games.position, 
            player.player.age, 
            player.statistics[0].team.name, 
            player.player.nationality
        ]);
    }
}

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

        // Fonction pour synchroniser les joueurs de la base de données avec les données actuelles de la Primeira Liga
        async function synchronizePlayers(season) {
            try {
                const players = await getPlayersFromPrimeiraLiga(94, season);  // 94 est l'ID de la ligue
                for (const player of players) {
                    await ensurePlayerExists(player);
                }
                console.log(`Synchronization complete for ${players.length} players.`);
            } catch (err) {
                console.error("Error during player synchronization:", err);
                throw err;
            }
        }

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