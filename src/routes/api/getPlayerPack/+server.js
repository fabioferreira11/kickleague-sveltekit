import { error, json } from '@sveltejs/kit';  // Importation des fonctions pour gérer les réponses d'erreur et JSON
import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL
import { getPlayersByClub, getPlayersFromPrimeiraLiga, filterPlayersByCountry, selectPlayersByPosition } from '$lib/api';  // Importation des fonctions pour récupérer les données des joueurs
import countryMappings from '$lib/paysMappings';  // Importation des mappages de pays

// Fonction pour vérifier si un joueur existe déjà dans la base de données, sinon l'insérer
async function ensurePlayerExists(player) {
    console.time('Check existing players');
    const existingPlayer = await mysqlDatabase.query('SELECT id FROM players WHERE id = ?', [player.player.id]);
    if (existingPlayer.length === 0) {
        await mysqlDatabase.query('INSERT INTO players (id, nom, photo_url, position, age, club, pays) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            player.player.id, player.player.name, player.player.photo, player.statistics[0].games.position, player.player.age, player.statistics[0].team.name, player.player.nationality
        ]);
    }
    console.timeEnd('Check existing players');
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

// Fonction pour gérer les requêtes POST à l'endpoint getPlayerPack
export async function POST({ request }) {
    const { userId } = await request.json();  // Extraction de l'ID utilisateur du corps de la requête

    console.log("Fetching player pack for user:", userId);

    try {
        // Vérifie si l'utilisateur a déjà des joueurs assignés
        const existingPlayers = await mysqlDatabase.query('SELECT 1 FROM user_players WHERE user_id = ?', [userId]);
        if (existingPlayers.length > 0) {
            const assignedPlayers = await getUserAssignedPlayers(userId);  // Récupère les joueurs assignés
            return json({ selectedPlayers: assignedPlayers });
        }

        // Récupère les détails du club et du pays de l'utilisateur
        console.time('Fetch user details');
        const userDetails = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        if (userDetails.length === 0) {
            return error(404, "User not found");
        }
        console.timeEnd('Fetch user details');

        const { club, pays } = userDetails[0];
        console.time('Synchronize players');
        await synchronizePlayers(new Date().getFullYear());  // Synchronisation des joueurs pour l'année en cours
        console.timeEnd('Synchronize players');

        // Récupère tous les joueurs de la Primeira Liga pour l'année en cours
        console.time('Fetch players from Primeira Liga');
        const allPlayers = await getPlayersFromPrimeiraLiga(94, new Date().getFullYear());
        console.timeEnd('Fetch players from Primeira Liga');
        console.time('Filter players by club');
        const clubPlayers = await getPlayersByClub(club, new Date().getFullYear());
        console.timeEnd('Filter players by club');
        console.time('Filter players by country');
        const countryPlayers = filterPlayersByCountry(allPlayers, countryMappings[pays.toLowerCase()]);
        console.timeEnd('Filter players by country');

        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
        console.time('Select players by position');
        let selectedPlayers = [];

        // Sélectionne les joueurs par position en fonction du club et du pays
        for (let position of positions) {
            let fromClub = await selectPlayersByPosition(clubPlayers, position, 1) || [];
            let fromCountry = await selectPlayersByPosition(countryPlayers, position, 1) || [];
            let additionalNeeded = 2 - (fromClub.length + fromCountry.length);
            let additionalPlayers = await selectPlayersByPosition(allPlayers, position, additionalNeeded) || [];

            selectedPlayers.push(...fromClub, ...fromCountry, ...additionalPlayers);
        }
        console.timeEnd('Select players by position');

        // Assigne les joueurs sélectionnés à l'utilisateur et les retourne en réponse
        console.time('Assign welcome pack players');
        await assignWelcomePackPlayers(userId, selectedPlayers.slice(0, 8));
        return json({ selectedPlayers: selectedPlayers.slice(0, 8) });
        console.timeEnd('Assign welcome pack players');
    } catch (error) {
        console.error("Error processing player pack request:", error);
        return json({ message: 'Internal Error' }, { status: 500 });
    }
}