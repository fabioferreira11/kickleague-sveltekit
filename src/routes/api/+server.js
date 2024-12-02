import nodemailer from 'nodemailer';  // Importation de Nodemailer pour envoyer des emails
import dotenv from 'dotenv';  // Importation de dotenv pour charger les variables d'environnement

// Chargement des variables d'environnement à partir du fichier .env
dotenv.config();

// Fonction pour gérer les requêtes POST à l'endpoint de l'API d'envoi d'emails
export async function POST({ request }) {
    const { prenom, nom, email, message } = await request.json();  // Extraction des données envoyées depuis le corps de la requête

    // Validation des champs obligatoires
    if (!prenom || !nom || !email || !message) {
        return new Response(
            JSON.stringify({ error: 'Missing required fields' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Configuration de Nodemailer pour utiliser les informations de connexion de l'email définies dans les variables d'environnement
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS 
        }
    });

    // Configuration des options de l'email à envoyer
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Nouveau message de contact',
        text: `Message de ${prenom} ${nom} (${email}): ${message}`,
        html: `
            <p><strong>Nom:</strong> ${prenom} ${nom}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        // Envoi de l'email en utilisant Nodemailer
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);  
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,  
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);  
        return new Response(JSON.stringify({ error: 'Error sending email', details: error.message }), {
            status: 500,  
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}