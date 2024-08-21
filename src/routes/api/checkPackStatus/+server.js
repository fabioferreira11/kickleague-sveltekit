import { mysqlDatabase } from '$lib/mysqlDatabase'; // Importation de la connexion à la base de données MySQL

// Fonction pour récupérer le statut d'ouverture du pack pour un utilisateur spécifique depuis la base de données
async function getPackStatusFromDB(userId) {
    const sql = `SELECT opened FROM user_packs WHERE user_id = ?`;  
    const results = await mysqlDatabase.query(sql, [userId]);  
    if (results.length > 0) {
        return { opened: results[0].opened };  
    }
    return { opened: false };  
}

// Fonction pour récupérer la liste des joueurs disponibles dans le pack (exemple simulé)
function getPlayersForPack() {
    return [
        { id: 1, name: "Joueur 1" },
        { id: 2, name: "Joueur 2" }
    ];
}

// Fonction pour gérer les requêtes POST à l'endpoint checkPackStatus
export async function POST({ request }) {
    const userId = (await request.json()).userId;  

    const packStatus = await getPackStatusFromDB(userId);  

    // Si le pack est déjà ouvert, retourne cette information
    if (packStatus.opened) {
        return new Response(JSON.stringify({ packOpened: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        // Si le pack n'est pas ouvert, retourne la liste des joueurs disponibles dans le pack
        const players = getPlayersForPack();
        return new Response(JSON.stringify({ packOpened: false, selectedPlayers: players }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
