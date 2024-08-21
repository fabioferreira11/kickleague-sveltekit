import { getSession } from '$lib/session';  // Importation de la fonction pour récupérer la session utilisateur

// Fonction pour gérer les requêtes GET à l'endpoint getUserId
export async function GET({ request }) {
    const cookies = request.headers.get('cookie') || '';  // Récupération des cookies depuis les en-têtes de la requête
    const session = getSession(cookies);  // Extraction de la session utilisateur à partir des cookies

    // Vérification si l'ID utilisateur est présent dans la session
    if (!session.userid) {
        return new Response(JSON.stringify({ error: 'No session found' }), { status: 401 });  // Retourne une erreur si aucune session n'est trouvée
    }

    // Retourne l'ID utilisateur en réponse JSON si la session est valide
    return new Response(JSON.stringify({ userId: session.userid }), { status: 200 });
}
