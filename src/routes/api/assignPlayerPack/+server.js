import { error, json } from '@sveltejs/kit'; // Gestion des réponses d'erreur et JSON
import { mysqlDatabase } from '$lib/mysqlDatabase'; // Connexion à la base de données MySQL
import { selectPlayersByPosition, assignWelcomePackPlayers } from '$lib/api'; // Import des fonctions pour sélectionner les joueurs
import redisClient from '$lib/redisClient'; // Importation du client Redis

export async function POST({ request }) {
    const { userId } = await request.json();

    console.log(`Assigning player pack for user: ${userId}`);

    try {
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

        // Assigner les joueurs à l'utilisateur
        await assignWelcomePackPlayers(userId, selectedPlayers.slice(0, 8));

        return json({ selectedPlayers: selectedPlayers.slice(0, 8) });
    } catch (err) {
        console.error("Error assigning player pack:", err);
        return error(500, "Internal Server Error");
    }
}