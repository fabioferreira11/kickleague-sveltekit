import { mysqlDatabase } from '../../src/lib/mysqlDatabase.js';
import { getPlayersFromPrimeiraLiga, filterPlayersByCountry, selectPlayersByPosition } from '../../src/lib/api.js';
import clubMappingsModule from '../../src/lib/clubMappings.js';
import countryMappingsModule from '../../src/lib/paysMappings.js';

const clubMappings = clubMappingsModule.default || clubMappingsModule;
const countryMappings = countryMappingsModule.default || countryMappingsModule;

const LEAGUE_ID = '94';
const season = 2024;

export const handler = async (event) => {
    try {
        if (!event.body) throw new Error("Request body is missing.");
        const { userId, checkStatus } = JSON.parse(event.body);
        if (!userId) throw new Error("User ID is missing in the request body.");

        console.log(`Starting background process for user ID: ${userId}`);

        // Vérification de l'état d'avancement si `checkStatus` est true
        if (checkStatus) {
            const existingPlayers = await mysqlDatabase.query('SELECT 1 FROM user_players WHERE user_id = ?', [userId]);
            if (existingPlayers.length > 0) {
                return { statusCode: 200, body: JSON.stringify({ status: 'completed', message: 'Players already assigned.' }) };
            } else {
                return { statusCode: 200, body: JSON.stringify({ status: 'in_progress', message: 'Players are being assigned.' }) };
            }
        }

        // Vérification des joueurs déjà assignés
        const existingPlayers = await mysqlDatabase.query('SELECT 1 FROM user_players WHERE user_id = ?', [userId]);
        if (existingPlayers.length > 0) {
            console.log(`Players already assigned to user ${userId}`);
            return { statusCode: 200, body: JSON.stringify({ status: 'completed', message: 'Players already assigned.' }) };
        }

        // Envoyer une réponse intermédiaire au client
        console.log("Processus d'attribution en cours...");

        // Récupération des informations utilisateur
        const [userDetails] = await mysqlDatabase.query('SELECT club, pays FROM users WHERE id = ?', [userId]);
        if (!userDetails) throw new Error("User not found in the database.");

        let { club, pays } = userDetails;
        club = String(club).trim().toLowerCase();
        pays = String(pays).trim().toLowerCase();

        console.log(`Pays avant mapping : '${pays}'`);
        console.log("Contenu de countryMappings :", countryMappings);

        // Vérification du mappage des clubs et pays
        const clubId = clubMappings[club];
        if (!clubId) throw new Error(`Invalid club abbreviation: '${club}'`);

        const country = countryMappings.hasOwnProperty(pays) ? countryMappings[pays] : pays;

        console.log(`Mapped country value : '${country}'`);
        console.log(`Mapped values: Club ID - ${clubId}, Country - ${country}`);

        // Récupération des joueurs
        const allPlayers = await getPlayersFromPrimeiraLiga(LEAGUE_ID, season);
        
        // Filtrer les joueurs selon l'ID du club
        const clubPlayers = allPlayers.filter(player => 
            player.statistics[0]?.team?.id === clubId
        );

        const countryPlayers = filterPlayersByCountry(allPlayers, country);

        console.log(`Fetched players count: Club (${clubPlayers.length}), Country (${countryPlayers.length})`);

        // Sélection des joueurs par position
        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
        let selectedPlayers = [];

        for (let position of positions) {
            let fromClub = await selectPlayersByPosition(clubPlayers, position, 1);
            let fromCountry = await selectPlayersByPosition(countryPlayers, position, 1);
            let remaining = 2 - (fromClub.length + fromCountry.length);
            let additional = await selectPlayersByPosition(allPlayers, position, remaining);

            selectedPlayers.push(...fromClub, ...fromCountry, ...additional);
        }

        const finalPlayers = selectedPlayers.slice(0, 8);
        console.log(`Final selected players:`, finalPlayers);

        // Insertion des joueurs dans la base de données
        for (let player of finalPlayers) {
            const [existing] = await mysqlDatabase.query('SELECT id FROM players WHERE id = ?', [player.player.id]);
            if (!existing) {
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
            await mysqlDatabase.query(
                'INSERT INTO user_players (user_id, player_id) VALUES (?, ?)',
                [userId, player.player.id]
            );
        }

        console.log(`Players successfully assigned for user ${userId}`);
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'completed', message: 'Players successfully assigned.', players: finalPlayers }),
        };

    } catch (error) {
        console.error('Error in background function:', error);
        return { statusCode: 500, body: JSON.stringify({ status: 'error', message: error.message || "Unexpected server error" }) };
    }
};