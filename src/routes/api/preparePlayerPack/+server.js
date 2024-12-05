import { error, json } from '@sveltejs/kit';
import { mysqlDatabase } from '$lib/mysqlDatabase';
import { getPlayersFromPrimeiraLiga } from '$lib/api';
import redisClient from '$lib/redisClient';

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
        // Étape 1 : Vérifier si l'utilisateur a déjà des joueurs attribués
        const existingPlayers = await mysqlDatabase.query('SELECT player_id FROM user_players WHERE user_id = ?', [userId]);
        if (existingPlayers.length > 0) {
            console.log(`User ${userId} already has assigned players. Skipping preparation.`);
            
            // Toujours mettre en cache les informations utilisateur
            const userDetails = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
            if (userDetails.length > 0) {
                const { club, pays } = userDetails[0];
                await redisClient.set(`user_${userId}_details`, JSON.stringify({ club, pays }), {
                    EX: 3600, // Expire en 1 heure
                });
            }

            return json({ message: "User already has assigned players" });
        }

        // Étape 2 : Vérifier si l'utilisateur existe
        const userDetails = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        if (userDetails.length === 0) {
            return error(404, "User not found");
        }

        const { club, pays } = userDetails[0];

        // Étape 3 : Synchroniser les joueurs si nécessaire
        async function synchronizePlayers(season) {
            try {
                const players = await getPlayersFromPrimeiraLiga(94, season);
                for (const player of players) {
                    await ensurePlayerExists(player);
                }
                console.log(`Synchronization complete for ${players.length} players.`);
            } catch (err) {
                console.error("Error during player synchronization:", err);
                throw err;
            }
        }

        await synchronizePlayers(new Date().getFullYear());

        // Étape 4 : Stocker les informations utilisateur dans une base temporaire (cache)
        await redisClient.set(`user_${userId}_details`, JSON.stringify({ club, pays }), {
            EX: 3600, // Expire en 1 heure
        });

        return json({ message: "User data prepared successfully" });
    } catch (err) {
        console.error("Error preparing data for user:", err);
        return error(500, "Internal Server Error");
    }
}