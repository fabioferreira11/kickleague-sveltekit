import { mysqlDatabase } from '$lib/mysqlDatabase';
import bcrypt from 'bcrypt';
import { error } from '@sveltejs/kit';
import { serialize } from 'cookie';

// Fonction principale qui gère la création de compte utilisateur
export async function POST({ request }) {
    // Extraction des données du formulaire
    const formData = await request.formData();
    const pseudo = formData.get('pseudo');
    const datedenaissance = formData.get('datedenaissance');
    const email = formData.get('email');
    const mdp = formData.get('mdp');
    const confirmmdp = formData.get('confirm_mdp');

    // Validation des données du formulaire, en particulier la correspondance des mots de passe
    if (!email || !mdp || !confirmmdp || mdp !== confirmmdp) {
        console.log('Validation failed: Passwords must match and all fields must be filled.');
        return error(400, 'Please make sure that the passwords match and all fields are filled.');
    }

    let hashedPassword;
    try {
        // Hachage du mot de passe avant de l'enregistrer dans la base de données
        console.log('Hashing password');
        hashedPassword = await bcrypt.hash(mdp, 10);
    } catch (err) {
        console.error('Error hashing password:', err);
        return error(500, `Server error during hashing: ${err.message}`);
    }

    let userId, sessionCookie;
    try {
        // Insertion de l'utilisateur dans la base de données
        console.log('Inserting user into database');
        const result = await mysqlDatabase.query(
            'INSERT INTO users (pseudo, datedenaissance, email, mdp) VALUES (?, ?, ?, ?)',
            [pseudo, datedenaissance, email, hashedPassword]
        );

        // Vérification que l'utilisateur a bien été inséré et création d'un cookie de session
        if (result.insertId) {
            userId = result.insertId;
            console.log('User ID set in session:', userId);

            sessionCookie = serialize('session_id', userId.toString(), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
                sameSite: 'Lax',
                secure: false
            });
        } else {
            return error(500, 'User registration failed');
        }
    } catch (err) {
        console.error('Error during database insertion:', err);
        return error(500, `Server error during database operation: ${err.message}`);
    }

    // Redirection vers la page de choix de pays après une inscription réussie
    console.log('Setting cookie and redirecting to /choixpays');
    return new Response(null, {
        status: 303,
        headers: {
            'Location': '/choixpays',
            'Set-Cookie': sessionCookie
        }
    });
}