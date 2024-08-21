import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL
import { json } from '@sveltejs/kit';  // Importation de la fonction pour renvoyer des réponses JSON

// Fonction pour gérer les requêtes GET à l'endpoint check-email
export async function GET({ url }) {
    // Récupération du paramètre 'email' de l'URL
    const email = url.searchParams.get('email');
    if (!email) {
        // Retourne une erreur si le paramètre 'email' est manquant
        return json({ error: 'Email parameter is missing.' }, { status: 400 });
    }

    try {
        // Exécution d'une requête SQL pour vérifier si l'email existe dans la base de données
        const results = await mysqlDatabase.query('SELECT id FROM users WHERE email = ?', [email]);
        // Retourne un objet JSON indiquant si l'email existe
        return json({ exists: results.length > 0 });
    } catch (err) {
        // Gestion des erreurs de la base de données, retourne une erreur 500
        console.error('Database error:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
