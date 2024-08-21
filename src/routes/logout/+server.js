import { redirect } from '@sveltejs/kit'; // Importation pour gérer les redirections

export async function POST({ cookies }) {
    // Suppression du cookie de session en le définissant avec une date d'expiration passée
    cookies.set('session_id', '', {
        path: '/', 
        expires: new Date(0), 
        httpOnly: true, 
        sameSite: 'Lax' 
    });

    // Suppression des données utilisateur du stockage local (uniquement côté client)
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userSession'); // Efface la session utilisateur
        localStorage.removeItem('userCompositions'); // Efface les compositions de l'utilisateur
        console.log("Local storage cleared on logout"); 
    }

    // Redirection vers la page d'accueil après la déconnexion
    throw redirect(302, '/');
}
