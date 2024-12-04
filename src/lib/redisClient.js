import { createClient } from 'redis';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

let redisClient;

// Fonction pour initialiser Redis
async function initializeRedisClient() {
    if (!redisClient) {
        redisClient = createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            },
            password: process.env.REDIS_PASSWORD,
        });

        // Gestion des événements Redis
        redisClient.on('connect', () => {
            console.log('Redis client connected');
        });

        redisClient.on('error', (err) => {
            console.error('Redis connection error:', err);
        });

        try {
            await redisClient.connect();
            console.log('Redis connection established successfully.');
        } catch (err) {
            console.error('Failed to connect to Redis:', err);
            throw err;
        }
    }

    return redisClient;
}

// Fonction utilitaire pour garantir que le client Redis est connecté avant son utilisation
export async function ensureRedisConnected() {
    if (!redisClient || !redisClient.isOpen) {
        console.log('Redis client is not connected. Attempting to reconnect...');
        try {
            await initializeRedisClient();
        } catch (err) {
            console.error('Failed to reconnect Redis client:', err);
            throw err;
        }
    }
}

// Initialisation automatique au démarrage
initializeRedisClient().catch((err) => {
    console.error('Error during initial Redis setup:', err);
});

export default redisClient;