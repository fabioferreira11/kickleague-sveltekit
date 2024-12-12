import { mysqlDatabase } from '../../src/lib/mysqlDatabase.js';
import { getPlayersFromPrimeiraLiga, getPlayersByClub, filterPlayersByCountry, selectPlayersByPosition } from '../../src/lib/api.js';

const LEAGUE_ID = '94';
const season = 2023;

export const handler = async (event) => {
    try {
        // Vérification et extraction des données d'entrée
        if (!event.body) {
            throw new Error("Request body is missing.");
        }
        const { userId } = JSON.parse(event.body);
        if (!userId) {
            throw new Error("User ID is missing in the request body.");
        }
        console.log(`Starting background process for user ID: ${userId}`);

        // Étape 1 : Vérifier si des joueurs sont déjà attribués
        const existingPlayers = await mysqlDatabase.query('SELECT 1 FROM user_players WHERE user_id = ?', [userId]);
        console.log("Existing Players:", existingPlayers);

        if (existingPlayers.length > 0) {
            console.log(`Players already assigned for user: ${userId}`);
            return { 
                statusCode: 200, 
                body: JSON.stringify({ message: 'Players already assigned.', players: existingPlayers }) 
            };
        }

        // Étape 2 : Récupérer les détails de l'utilisateur
        const result = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        console.log(`User Details for user ID ${userId}:`, result);

        if (!result || result.length === 0) {
            throw new Error("User not found in the database.");
        }
        const { club, pays } = result[0];

        // Étape 3 : Synchroniser les joueurs
        const allPlayers = await getPlayersFromPrimeiraLiga(LEAGUE_ID, season);
        if (!allPlayers || allPlayers.length === 0) {
            throw new Error("No players found for Primeira Liga.");
        }
        console.log(`Total players fetched from Primeira Liga: ${allPlayers.length}`);

        const clubPlayers = await getPlayersByClub(club, season);
        console.log(`Players for club ${club}:`, clubPlayers);

        const countryPlayers = filterPlayersByCountry(allPlayers, pays);
        console.log(`Players for country ${pays}:`, countryPlayers);

        // Étape 4 : Sélectionner les 8 joueurs (2 par position)
        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
        let selectedPlayers = [];

        for (let position of positions) {
            console.log(`Selecting players for position: ${position}`);
            let fromClub = await selectPlayersByPosition(clubPlayers, position, 1);
            let fromCountry = await selectPlayersByPosition(countryPlayers, position, 1);
            let remaining = 2 - (fromClub.length + fromCountry.length);

            let additional = await selectPlayersByPosition(allPlayers, position, remaining);
            selectedPlayers.push(...fromClub, ...fromCountry, ...additional);

            console.log(`Selected players for ${position}:`, { fromClub, fromCountry, additional });
        }

        // Étape 5 : Vérifier et insérer les joueurs dans la table 'players'
        const finalPlayers = selectedPlayers.slice(0, 8);
        console.log(`Final players to assign for user ${userId}:`, finalPlayers);

        for (let player of finalPlayers) {
            const [existing] = await mysqlDatabase.query('SELECT id FROM players WHERE id = ?', [player.player.id]);

            if (!existing || existing.length === 0) {
                console.log(`Player ${player.player.id} does not exist. Inserting into 'players' table.`);
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

            // Insérer dans la table 'user_players'
            await mysqlDatabase.query(
                'INSERT INTO user_players (user_id, player_id) VALUES (?, ?)',
                [userId, player.player.id]
            );
        }

        console.log(`Players successfully assigned to user ${userId}`);
        return { 
            statusCode: 200, 
            body: JSON.stringify({ message: 'Players successfully assigned.', players: finalPlayers }) 
        };

    } catch (error) {
        console.error('Error in background function:', error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }) 
        };
    }
};