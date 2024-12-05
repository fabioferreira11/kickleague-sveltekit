import { error, json } from '@sveltejs/kit'; // Gestion des réponses d'erreur et JSON
import { mysqlDatabase } from '$lib/mysqlDatabase'; // Connexion à la base de données MySQL
import { selectPlayersByPosition } from '$lib/api'; // Import des fonctions pour sélectionner les joueurs
import redisClient from '$lib/redisClient'; // Importation du client Redis

export async function POST({ request }) {
    const { userId } = await request.json();

    console.log(`Assigning player pack for user: ${userId}`);

    try {
        // Vérifier si des joueurs ont déjà été attribués à cet utilisateur
        const existingPlayers = await mysqlDatabase.query(
            'SELECT player_id FROM user_players WHERE user_id = ?',
            [userId]
        );

        if (existingPlayers.length > 0) {
            console.log(`User ${userId} already has assigned players.`);
            return json({
                message: "Players already assigned",
                assignedPlayers: existingPlayers,
            });
        }

        // Récupérer les joueurs intermédiaires du cache
        const playerCache = await redisClient.get(`user_${userId}_players`);
        if (!playerCache) {
            return error(400, "Player list not generated");
        }

        const { allPlayers, clubPlayers, countryPlayers } = JSON.parse(playerCache);

        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
        let selectedPlayers = [];

        for (let position of positions) {
            const fromClub = await selectPlayersByPosition(clubPlayers, position, 1) || [];
            const fromCountry = await selectPlayersByPosition(countryPlayers, position, 1) || [];
            const additionalNeeded = 2 - (fromClub.length + fromCountry.length);
            const additionalPlayers = await selectPlayersByPosition(allPlayers, position, additionalNeeded) || [];

            selectedPlayers.push(...fromClub, ...fromCountry, ...additionalPlayers);
        }

        // Fonction pour assigner un pack de bienvenue avec des joueurs à un utilisateur
        async function assignWelcomePackPlayers(userId, players) {
            const validPlayers = players.filter(player => player && player.player && player.player.id);
            const playerIds = validPlayers.map(player => player.player.id);
            const queries = playerIds.map(playerId =>
                mysqlDatabase.query('INSERT INTO user_players (user_id, player_id) VALUES (?, ?)', [userId, playerId])
            );
            await Promise.all(queries);
        }

        // Appeler la fonction pour assigner les joueurs à l'utilisateur
        await assignWelcomePackPlayers(userId, selectedPlayers.slice(0, 8));

        return json({ selectedPlayers: selectedPlayers.slice(0, 8) });
    } catch (err) {
        console.error("Error assigning player pack:", err);
        return error(500, "Internal Server Error");
    }
}