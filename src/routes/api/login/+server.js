import { mysqlDatabase } from '$lib/mysqlDatabase';  // Importation de la connexion à la base de données MySQL
import bcrypt from 'bcrypt';  // Importation de bcrypt pour comparer les mots de passe
import { error, json } from '@sveltejs/kit';  // Importation des fonctions pour gérer les réponses d'erreur et JSON
import { serialize } from 'cookie';  // Importation de la fonction pour gérer les cookies

// Fonction pour gérer les requêtes POST à l'endpoint login
export async function POST({ request }) {
    const { email, mdp } = await request.json();  // Extraction de l'email et du mot de passe depuis le corps de la requête
    console.log('Received email:', email);  
    console.log('Received password:', mdp);  

    try {
        // Requête SQL pour récupérer les informations de l'utilisateur avec l'email fourni
        const results = await mysqlDatabase.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        console.log('Query results:', results);  

        // Si un utilisateur est trouvé, vérifier le mot de passe
        if (results.length > 0) {
            const user = results[0];
            console.log('User found:', user);  

            // Comparaison du mot de passe fourni avec celui stocké dans la base de données
            if (await bcrypt.compare(mdp, user.mdp)) {
                console.log('Password match');  

                // Création d'un cookie de session pour l'utilisateur connecté
                const sessionCookie = serialize('session_id', user.id.toString(), {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,  // Durée de vie d'une semaine pour le cookie
                    path: '/',
                    sameSite: 'Lax',  
                    secure: false  
                });

                // Retourner une réponse avec le cookie de session et un statut de succès
                return new Response(JSON.stringify({ success: true }), {
                    status: 200,
                    headers: {
                        'Set-Cookie': sessionCookie,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                console.log('Password mismatch'); 
                return error(401, 'L\'email ou le mot de passe que vous avez fournis ne sont pas corrects.');
            }
        } else {
            console.log('No user found');  
            return error(401, 'L\'email ou le mot de passe que vous avez fournis ne sont pas corrects.');
        }
    } catch (err) {
        console.error('Database error:', err);  // Gestion des erreurs liées à la base de données
        return error(500, 'Erreur serveur lors de la tentative de connexion');
    }
}