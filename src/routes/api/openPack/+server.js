import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL

// Fonction pour marquer un pack comme ouvert pour un utilisateur spécifique
async function markPackAsOpened(userId, packId = 1) {  // packId est par défaut 1 si non spécifié
    // Requête SQL pour vérifier si l'utilisateur a déjà un enregistrement pour ce pack
    const sqlCheck = `SELECT * FROM user_packs WHERE user_id = ? AND pack_id = ?`;
    const results = await mysqlDatabase.query(sqlCheck, [userId, packId]);

    // Si aucun enregistrement n'est trouvé, insérer un nouveau enregistrement
    if (results.length === 0) {
        const sqlInsert = `INSERT INTO user_packs (user_id, pack_id, opened) VALUES (?, ?, true)`;
        await mysqlDatabase.query(sqlInsert, [userId, packId]);
    } else {
        // Si un enregistrement existe déjà, le mettre à jour pour indiquer que le pack est ouvert
        const sqlUpdate = `UPDATE user_packs SET opened = true WHERE user_id = ? AND pack_id = ?`;
        await mysqlDatabase.query(sqlUpdate, [userId, packId]);
    }

    return { success: true };  // Retourne un indicateur de succès
}

// Fonction pour gérer les requêtes POST à l'endpoint openPack
export async function POST({ request }) {
    const { userId, packId } = await request.json();  // Extraction de l'ID utilisateur et du packId depuis le corps de la requête
    const result = await markPackAsOpened(userId, packId);  // Marque le pack comme ouvert pour cet utilisateur
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}