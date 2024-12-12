import mysqlDatabase from '../../src/lib/mysqlDatabase.js';
import { getPlayersFromPrimeiraLiga, getPlayersByClub, filterPlayersByCountry, selectPlayersByPosition } from '../../src/lib/api.js';

const LEAGUE_ID = '94';
const CURRENT_YEAR = 2023;

export const handler = async (event) => {
    try {
        // Extraction des données de la requête
        const { userId } = JSON.parse(event.body);

        console.log(`Starting background process for user ID: ${userId}`);

        // Étape 1 : Vérifier si des joueurs sont déjà attribués
        const existingPlayers = await mysqlDatabase.query('SELECT 1 FROM user_players WHERE user_id = ?', [userId]);
        if (existingPlayers.length > 0) {
            return { 
                statusCode: 200, 
                body: JSON.stringify({ message: 'Players already assigned.' }) 
            };
        }

        // Étape 2 : Récupérer les détails de l'utilisateur
        const [userDetails] = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        if (!userDetails) throw new Error("User not found");

        const { club, pays } = userDetails;

        // Étape 3 : Synchroniser les joueurs
        const allPlayers = await getPlayersFromPrimeiraLiga(LEAGUE_ID, CURRENT_YEAR);
        const clubPlayers = await getPlayersByClub(club, CURRENT_YEAR);
        const countryPlayers = filterPlayersByCountry(allPlayers, pays);

        // Étape 4 : Sélectionner les 8 joueurs (2 par position)
        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
        let selectedPlayers = [];

        for (let position of positions) {
            let fromClub = await selectPlayersByPosition(clubPlayers, position, 1);
            let fromCountry = await selectPlayersByPosition(countryPlayers, position, 1);
            let remaining = 2 - (fromClub.length + fromCountry.length);
            let additional = await selectPlayersByPosition(allPlayers, position, remaining);

            selectedPlayers.push(...fromClub, ...fromCountry, ...additional);
        }

        // Étape 5 : Enregistrer les joueurs en base de données
        const queries = selectedPlayers.slice(0, 8).map(player =>
            mysqlDatabase.query('INSERT INTO user_players (user_id, player_id) VALUES (?, ?)', [userId, player.player.id])
        );
        await Promise.all(queries);

        console.log(`Players assigned to user ${userId}`);
        return { 
            statusCode: 200, 
            body: JSON.stringify({ message: 'Players successfully assigned.' }) 
        };
    } catch (error) {
        console.error('Error in background function:', error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: error.message }) 
        };
    }
};