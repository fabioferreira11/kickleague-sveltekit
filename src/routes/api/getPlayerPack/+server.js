import { error, json } from '@sveltejs/kit';  // Importation des fonctions pour gérer les réponses d'erreur et JSON
import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL
import { getPlayersByClub, getPlayersFromPrimeiraLiga, filterPlayersByCountry, selectPlayersByPosition } from '$lib/api';  // Importation des fonctions pour récupérer les données des joueurs
import countryMappings from '$lib/paysMappings';  // Importation des mappages de pays
import redisClient from '$lib/redisClient';// Importation du client Redis

// Fonction pour vérifier si un joueur existe déjà dans la base de données, sinon l'insérer
async function ensurePlayerExists(player) {
    const existingPlayer = await mysqlDatabase.query('SELECT id FROM players WHERE id = ?', [player.player.id]);
    if (existingPlayer.length === 0) {
        await mysqlDatabase.query('INSERT INTO players (id, nom, photo_url, position, age, club, pays) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            player.player.id, player.player.name, player.player.photo, player.statistics[0].games.position, player.player.age, player.statistics[0].team.name, player.player.nationality
        ]);
    }
}

// Fonction pour récupérer les joueurs déjà assignés à un utilisateur spécifique
async function getUserAssignedPlayers(userId) {
    return await mysqlDatabase.query(
        `SELECT p.id, p.nom, p.photo_url, p.position, p.age, p.club, p.pays
        FROM user_players up
        JOIN players p ON up.player_id = p.id
        WHERE up.user_id = ?`, [userId]
    );
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

// Fonction pour synchroniser les joueurs de la base de données avec les données actuelles de la Primeira Liga
async function synchronizePlayers(season) {
    const cacheKey = `primeira_liga_sync_${season}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        console.log("Synchronization skipped, data already cached.");
        return JSON.parse(cachedData);
    }

    try {
        const players = await getPlayersFromPrimeiraLiga(94, season); // 94 est l'ID de la ligue
        for (const player of players) {
            await ensurePlayerExists(player);
        }

        console.log(`Synchronization complete for ${players.length} players.`);

        // Mettre en cache les données synchronisées
        await redisClient.set(cacheKey, JSON.stringify(players), {
            EX: 3600, // 1 heure
        });

        return players;
    } catch (err) {
        console.error("Error during player synchronization:", err);
        throw err;
    }
}

// Fonction pour gérer les requêtes POST à l'endpoint getPlayerPack
export async function POST({ request }) {
    const { userId } = await request.json();

    console.log("Fetching player pack for user:", userId);

    try {
        // Étape 1 : Vérifiez si les joueurs sont déjà en cache
        const cacheKey = `user_${userId}_players`;
        const cachedPlayers = await redisClient.get(cacheKey);

        if (cachedPlayers) {
            console.log("Données récupérées du cache Redis.");
            return json({ selectedPlayers: JSON.parse(cachedPlayers) });
        }

        // Étape 2 : Vérifiez si l'utilisateur a des joueurs assignés
        const existingPlayers = await getUserAssignedPlayers(userId);
        if (existingPlayers.length > 0) {
            console.log("Players found in database.");
            await redisClient.set(cacheKey, JSON.stringify(existingPlayers), {
                EX: 3600, // Expiration en 1 heure
            });
            return json({ selectedPlayers: existingPlayers });
        }

        // Étape 3 : Synchronisez les joueurs si nécessaire
        const userDetails = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        if (userDetails.length === 0) {
            return error(404, "User not found");
        }

        const { club, pays } = userDetails[0];
        const allPlayers = await synchronizePlayers(new Date().getFullYear());
        const clubPlayers = await getPlayersByClub(club, new Date().getFullYear());
        const countryPlayers = filterPlayersByCountry(allPlayers, countryMappings[pays.toLowerCase()]);

        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
        let selectedPlayers = [];

        for (let position of positions) {
            const fromClub = await selectPlayersByPosition(clubPlayers, position, 1) || [];
            const fromCountry = await selectPlayersByPosition(countryPlayers, position, 1) || [];
            const additionalNeeded = 2 - (fromClub.length + fromCountry.length);
            const additionalPlayers = await selectPlayersByPosition(allPlayers, position, additionalNeeded) || [];

            selectedPlayers.push(...fromClub, ...fromCountry, ...additionalPlayers);
        }

        // Étape 4 : Assigner les joueurs et mettre en cache
        await assignWelcomePackPlayers(userId, selectedPlayers.slice(0, 8));
        await redisClient.set(cacheKey, JSON.stringify(selectedPlayers.slice(0, 8)), {
            EX: 3600, // Expiration en 1 heure
        });

        return json({ selectedPlayers: selectedPlayers.slice(0, 8) });
    } catch (error) {
        console.error("Error processing player pack request:", error);
        return json({ message: 'Internal Error' }, { status: 500 });
    }
}