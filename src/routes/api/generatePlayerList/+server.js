import { error, json } from '@sveltejs/kit'; // Gestion des réponses d'erreur et JSON
import { getPlayersByClub, getPlayersFromPrimeiraLiga, filterPlayersByCountry } from '$lib/api'; // Import des fonctions pour récupérer les données des joueurs
import redisClient from '$lib/redisClient'; // Importation du client Redis
import countryMappings from '$lib/paysMappings'; // Importation des mappages de pays

export async function POST({ request }) {
    const { userId } = await request.json();

    console.log(`Generating player list for user: ${userId}`);

    try {
        // Récupérer les informations utilisateur du cache
        const userCache = await redisClient.get(`user_${userId}_details`);
        if (!userCache) {
            return error(400, "User data not prepared");
        }

        const { club, pays } = JSON.parse(userCache);

        // Récupérer tous les joueurs
        const allPlayers = await getPlayersFromPrimeiraLiga(94, new Date().getFullYear());
        const clubPlayers = await getPlayersByClub(club, new Date().getFullYear());
        const countryPlayers = filterPlayersByCountry(allPlayers, countryMappings[pays.toLowerCase()]);

        // Stocker temporairement les résultats intermédiaires
        await redisClient.set(`user_${userId}_players`, JSON.stringify({ allPlayers, clubPlayers, countryPlayers }), {
            EX: 3600,
        });

        return json({ message: "Player list generated successfully" });
    } catch (err) {
        console.error("Error generating player list:", err);
        return error(500, "Internal Server Error");
    }
}