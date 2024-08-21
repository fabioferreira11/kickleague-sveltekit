import { getSession } from '$lib/session';  // Importation de la fonction pour récupérer la session utilisateur à partir des cookies
import { error, json } from '@sveltejs/kit';  // Importation des fonctions pour gérer les erreurs et les réponses JSON

// Fonction pour gérer les requêtes GET à l'endpoint session
export async function GET({ request }) {
    const cookies = request.headers.get('cookie');  
    const session = getSession(cookies);  

    // Vérification si une session valide est trouvée avec un userid
    if (session && session.userid) {
        return json({ userid: session.userid });  
    } else {
        return error(401, "No active session found."); 
    }
}
