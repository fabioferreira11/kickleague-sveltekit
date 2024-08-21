import { json } from '@sveltejs/kit';  // Importation de la fonction pour renvoyer des réponses JSON

const API_URL = 'https://v3.football.api-sports.io/';  // URL de base de l'API externe
const API_KEY = '0ba5f424070a8357e46e974a8de6c542';  // Clé API pour accéder à l'API football

const cache = new Map();  // Initialisation d'un cache en mémoire pour stocker temporairement les résultats

// Fonction pour gérer les requêtes GET à l'endpoint players
export async function GET({ url }) {
    const playerId = url.searchParams.get('id');  
    const season = url.searchParams.get('season');  

    // Vérification si les paramètres nécessaires sont présents
    if (!playerId || !season) {
        return json({ error: 'Player ID and season are required' }, { status: 400 });  // Retourne une erreur 400 si des paramètres sont manquants
    }

    const cacheKey = `${playerId}-${season}`;  // Génération d'une clé unique pour le cache
    if (cache.has(cacheKey)) {
        console.log(`Serving data for ${cacheKey} from cache`);  // Log si les données sont servies depuis le cache
        return json(cache.get(cacheKey), { status: 200 });  // Retourne les données en cache si elles existent
    }

    const apiUrl = `https://v3.football.api-sports.io/players?id=${playerId}&season=${season}`;  // Construction de l'URL de l'API externe

    try {
        // Requête à l'API externe pour récupérer les données du joueur
        const response = await fetch(apiUrl, {
            headers: {
                'x-rapidapi-key': API_KEY,  // Ajout de la clé API dans les en-têtes de la requête
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        });

        // Vérification si la réponse de l'API est correcte
        if (!response.ok) {
            console.error(`Failed to fetch data: ${response.statusText}`);
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();  // Conversion de la réponse en JSON
        if (data.response && data.response.length > 0) {
            cache.set(cacheKey, data.response[0]);  // Mise en cache des données récupérées
            return json(data.response[0], { status: 200 });  // Retourne les données du joueur
        } else {
            return json({ error: 'Player not found' }, { status: 404 });  // Retourne une erreur 404 si le joueur n'est pas trouvé
        }
    } catch (error) {
        console.error('Error fetching player data:', error);  // Gestion des erreurs lors de la requête à l'API
        return json({ error: 'Failed to fetch player data' }, { status: 500 });  // Retourne une erreur 500 en cas de problème serveur
    }
}