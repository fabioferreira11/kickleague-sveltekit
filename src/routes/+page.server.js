import { getSession } from '$lib/session';
import { getUserById } from '$lib/database'; // Assurez-vous que le chemin est correct

/** 
 * Cette fonction charge les données nécessaires pour le layout de la page.
 * Elle récupère la session utilisateur à partir des cookies, puis vérifie et charge les informations de l'utilisateur si une session valide est trouvée.
 * @type {import('@sveltejs/kit').LayoutServerLoad}
 */
export async function load({ request }) {
    const cookies = request.headers.get('cookie');
    const session = getSession(cookies);  // Récupère la session à partir des cookies

    // Si aucune session valide n'est trouvée, retourne un objet indiquant l'absence de l'utilisateur
    if (!session || !session.userid) {
        console.log('No session or user ID found, clearing any potential stale session.');
        return {
            user: null,  // Aucun utilisateur n'est connecté
            headers: {
                // Expire immédiatement le cookie de session pour effacer toute session potentiellement obsolète
                'Set-Cookie': 'session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
            }
        };
    }

    try {
        const user = await getUserById(session.userid);  // Tente de récupérer l'utilisateur par ID de session
        if (user) {
            return { user };  // Retourne l'utilisateur si trouvé
        } else {
            console.log('No user found with the ID from session, clearing session cookie.');
            return {
                user: null,  // L'utilisateur n'existe pas pour cet ID de session
                headers: {
                    // Expire le cookie de session si aucun utilisateur correspondant n'est trouvé
                    'Set-Cookie': 'session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
                }
            };
        }
    } catch (error) {
        console.error('Failed to fetch user:', error);  // Gère toute erreur survenant lors de la récupération des données utilisateur
        return {
            error: 'Failed to load user data',  // Message d'erreur à retourner si la récupération échoue
            user: null,  // Aucun utilisateur n'est retourné en cas d'erreur
            headers: {
                // Expire le cookie de session en cas d'erreur pour éviter d'utiliser une session invalide
                'Set-Cookie': 'session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
            }
        };
    }
}