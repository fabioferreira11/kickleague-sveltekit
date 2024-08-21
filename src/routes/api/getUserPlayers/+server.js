import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL

// Fonction pour gérer les requêtes POST à l'endpoint getUserPlayers
export async function POST({ request }) {
    try {
        // Extraction de l'ID utilisateur depuis le corps de la requête
        const { userId } = await request.json();

        // Vérification si l'ID utilisateur est présent
        if (!userId) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), {
                status: 400,  // Retourne une erreur 400 si l'ID utilisateur est manquant
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Requête SQL pour récupérer les identifiants des joueurs associés à l'utilisateur
        const query = `
            SELECT player_id
            FROM user_players
            WHERE user_id = ?
        `;
        const players = await mysqlDatabase.query(query, [userId]);

        // Formater les résultats pour s'assurer que chaque joueur est correctement mappé
        const formattedPlayers = players.map(player => ({
            id: player.player_id,  // Mappage du champ `player_id` vers `id`
        }));

        // Retourne la liste des joueurs formatée en réponse JSON
        return new Response(JSON.stringify(formattedPlayers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching players:', error);  // Gestion des erreurs lors de la récupération des joueurs
        return new Response(JSON.stringify({ error: 'Failed to fetch players' }), {
            status: 500,  // Retourne une erreur 500 en cas de problème serveur
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}