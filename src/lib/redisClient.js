import { createClient } from 'redis';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const redisClient = createClient({
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

// Connecter le client Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis connection established successfully.');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

export default redisClient;
