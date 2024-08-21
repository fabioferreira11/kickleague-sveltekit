import { parse, serialize } from 'cookie';  // Importation des fonctions pour manipuler les cookies

const SESSION_NAME = 'session_id';  // Nom de la clé du cookie qui stocke l'ID de session

// Fonction pour récupérer la session utilisateur à partir des cookies
export function getSession(cookies) {
    // Analyse les cookies reçus pour extraire les données
    const cookie = parse(cookies || '');
    return {
        userid: cookie[SESSION_NAME]  // Retourne l'ID utilisateur associé à la session
    };
}
