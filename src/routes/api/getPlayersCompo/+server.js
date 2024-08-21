import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL
import { getSession } from '$lib/session';  // Importation de la fonction pour récupérer la session utilisateur

// Fonction pour gérer les requêtes GET à l'endpoint getPlayerCompo
export async function GET({ request, url }) {
    // Récupération de la session utilisateur à partir des cookies
    const session = await getSession(request.headers.get('cookie'));
    const userId = session.userid;  // Extraction de l'ID utilisateur de la session
    const position = url.searchParams.get('position');  // Récupération de la position depuis les paramètres de requête

    // Vérification si l'ID utilisateur est présent
    if (!userId) {
        console.log("ID utilisateur non trouvé");
        return new Response(JSON.stringify({ error: 'Session not found' }), { status: 401 });
    }

    console.log("ID utilisateur:", userId);
    console.log("Position demandée:", position);

    // Construction de la requête SQL pour récupérer les joueurs en fonction de la position
    const sql = position === 'Tous' 
    ? `SELECT p.id, p.nom, p.photo_url, p.position, p.club FROM players p JOIN user_players up ON p.id = up.player_id WHERE up.user_id = ?`
    : `SELECT p.id, p.nom, p.photo_url, p.position, p.club FROM players p JOIN user_players up ON p.id = up.player_id WHERE up.user_id = ? AND p.position = ?`;

    try {
        // Exécution de la requête SQL avec ou sans filtrage par position
        const players = position === 'Tous'
            ? await mysqlDatabase.query(sql, [userId])
            : await mysqlDatabase.query(sql, [userId, position]);

        console.log("Joueurs récupérés:", players);  // Log des joueurs récupérés
        return new Response(JSON.stringify({ userId, players }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Failed to fetch players:', error);  // Gestion des erreurs lors de la récupération des joueurs
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}