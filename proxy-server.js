import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Crée une application Express
const app = express();
const API_URL = 'https://v3.football.api-sports.io/';
const API_KEY = '0ba5f424070a8357e46e974a8de6c542';

// Utilisation du middleware CORS pour permettre les requêtes depuis n'importe quelle origine
app.use(cors({origin: ['https://kickleague.netlify.app', 'http://localhost:3000']}));


/* 
   Route GET dynamique pour gérer les requêtes vers l'API externe.
   Le paramètre `endpoint` est dynamique et représente l'endpoint de l'API que vous souhaitez interroger.
   Les `queryParams` sont les paramètres de requête passés avec l'URL.
*/
app.get('/api/:endpoint', async (req, res) => {
    const { endpoint } = req.params; 
    const queryParams = req.query;  

    // Construit l'URL complète en ajoutant les paramètres de requête à l'endpoint
    const url = `${API_URL}${endpoint}?${new URLSearchParams(queryParams)}`;

    try {
        // Envoie une requête à l'API externe avec les en-têtes requis
        const response = await fetch(url, {
            headers: {
                "x-rapidapi-key": API_KEY,          
                "x-rapidapi-host": "v3.football.api-sports.io" 
            }
        });

        // Convertit la réponse en JSON
        const data = await response.json();

        // Renvoie les données JSON obtenues de l'API au client
        res.json(data);
    } catch (error) {
        // En cas d'erreur lors de la requête, log l'erreur et renvoie un statut 500
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Définit le port sur lequel le serveur écoute
const port = 3000;

// Démarre le serveur sur le port défini et affiche un message dans la console
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});