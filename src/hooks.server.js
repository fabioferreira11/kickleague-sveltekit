import { parse } from 'cookie';

// Fonction principale pour gérer chaque requête avant qu'elle ne soit résolue
export async function handle({ event, resolve }) {
    console.log('Handling request:', event.request.url);

    // Récupère les cookies de la requête
    const cookies = event.request.headers.get('cookie');
    if (cookies) {
        // Si des cookies existent, on les analyse avec la fonction `parse` de `cookie`
        const parsedCookies = parse(cookies);

        // Si le cookie 'session_id' est présent, on l'assigne à `event.locals.userid`
        if (parsedCookies.session_id) {
            event.locals.userid = parsedCookies.session_id;
            console.log('Session ID found:', parsedCookies.session_id); 
        } else {
            // Si le cookie 'session_id' n'est pas trouvé
            console.log('No session ID in cookies');
        }
    } else {
        // Si aucun cookie n'est présent dans la requête
        console.log('No cookies found');
    }

    // Résout la requête et retourne la réponse
    const response = await resolve(event);
    return response;
}