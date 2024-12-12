import { mysqlDatabase } from '../../src/lib/mysqlDatabase.js';
import { getPlayersFromPrimeiraLiga, getPlayersByClub, filterPlayersByCountry, selectPlayersByPosition } from '../../src/lib/api.js';
import clubMappings from '../../src/lib/clubMappings.js';
import countryMappings from '../../src/lib/paysMappings.js';

const LEAGUE_ID = '94';
const season = 2023;

export const handler = async (event) => {
    try {
        // Étape 1 : Vérification de l'entrée utilisateur
        if (!event.body) throw new Error("Request body is missing.");
        const { userId } = JSON.parse(event.body);
        if (!userId) throw new Error("User ID is missing in the request body.");
        console.log(`Starting background process for user ID: ${userId}`);

        // Étape 2 : Vérifier si des joueurs sont déjà attribués
        const existingPlayers = await mysqlDatabase.query('SELECT 1 FROM user_players WHERE user_id = ?', [userId]);
        if (existingPlayers.length > 0) {
            console.log(`Players already assigned to user ${userId}`);
            return { statusCode: 200, body: JSON.stringify({ message: 'Players already assigned.' }) };
        }

        // Étape 3 : Récupérer les détails de l'utilisateur
        const [userDetails] = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        if (!userDetails) throw new Error("User not found in the database.");

        console.log("Raw user details from DB:", userDetails); // Log des détails bruts
        let { club, pays } = userDetails;

        // Nettoyage et validation des clés
        club = String(club).trim().toLowerCase();
        pays = String(pays).trim().toLowerCase();

        console.log(`Cleaned user details: Club - '${club}', Pays - '${pays}'`);

        // Debug : afficher les clés disponibles dans clubMappings
        console.log('Available club keys in clubMappings:', Object.keys(clubMappings));

        // Validation et mappage des valeurs
        const clubId = clubMappings[club];
        console.log(`Mapped club ID for '${club}':`, clubId);
        if (!clubId) {
            throw new Error(`Invalid club abbreviation: '${club}'. Check available keys above.`);
        }

        const country = countryMappings[pays] || pays;
        console.log(`Mapped values: Club ID - ${clubId}, Country - ${country}`);

        // Étape 4 : Synchroniser les joueurs
        console.log(`Fetching players for Primeira Liga (League ID: ${LEAGUE_ID}, Season: ${season})`);
        const allPlayers = await getPlayersFromPrimeiraLiga(LEAGUE_ID, season);
        if (!allPlayers || !allPlayers.length) throw new Error("No players found for Primeira Liga.");

        console.log(`Fetching players for club ID: ${clubId}`);
        const clubPlayers = await getPlayersByClub(clubId, season);
        console.log(`Fetched ${clubPlayers.length} players for club ID ${clubId}`);

        console.log(`Filtering players for country: ${country}`);
        const countryPlayers = filterPlayersByCountry(allPlayers, country);
        console.log(`Fetched players count: Club (${clubPlayers.length}), Country (${countryPlayers.length})`);

        // Étape 5 : Sélectionner 8 joueurs (2 par position)
        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
        let selectedPlayers = [];

        for (let position of positions) {
            console.log(`Selecting players for position: ${position}`);
            let fromClub = await selectPlayersByPosition(clubPlayers, position, 1);
            let fromCountry = await selectPlayersByPosition(countryPlayers, position, 1);
            let remaining = 2 - (fromClub.length + fromCountry.length);

            console.log(`Selected players from club (${fromClub.length}), country (${fromCountry.length}), additional remaining: ${remaining}`);
            let additional = await selectPlayersByPosition(allPlayers, position, remaining);
            selectedPlayers.push(...fromClub, ...fromCountry, ...additional);
        }

        const finalPlayers = selectedPlayers.slice(0, 8);
        console.log(`Final selected players:`, finalPlayers);

        // Étape 6 : Insérer les joueurs dans les tables 'players' et 'user_players'
        for (let player of finalPlayers) {
            console.log(`Checking if player ID ${player.player.id} exists in 'players' table`);
            const [existing] = await mysqlDatabase.query('SELECT id FROM players WHERE id = ?', [player.player.id]);
            if (!existing) {
                console.log(`Inserting new player ID ${player.player.id} into 'players' table`);
                await mysqlDatabase.query(`
                    INSERT INTO players (id, nom, photo_url, position, age, club, pays)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `, [
                    player.player.id,
                    player.player.name,
                    player.player.photo,
                    player.statistics[0]?.games?.position || 'Unknown',
                    player.player.age || 0,
                    player.statistics[0]?.team?.name || 'Unknown',
                    player.player.nationality || 'Unknown'
                ]);
            }

            console.log(`Assigning player ID ${player.player.id} to user ID ${userId}`);
            await mysqlDatabase.query(
                'INSERT INTO user_players (user_id, player_id) VALUES (?, ?)',
                [userId, player.player.id]
            );
        }

        console.log(`Players successfully assigned for user ${userId}`);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Players successfully assigned.', players: finalPlayers }),
        };

    } catch (error) {
        console.error('Error in background function:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Internal Server Error' }) };
    }
};