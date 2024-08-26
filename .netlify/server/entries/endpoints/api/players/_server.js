import { j as json } from "../../../../chunks/index.js";
const API_KEY = "0ba5f424070a8357e46e974a8de6c542";
const cache = /* @__PURE__ */ new Map();
async function GET({ url }) {
  const playerId = url.searchParams.get("id");
  const season = url.searchParams.get("season");
  if (!playerId || !season) {
    return json({ error: "Player ID and season are required" }, { status: 400 });
  }
  const cacheKey = `${playerId}-${season}`;
  if (cache.has(cacheKey)) {
    console.log(`Serving data for ${cacheKey} from cache`);
    return json(cache.get(cacheKey), { status: 200 });
  }
  const apiUrl = `https://v3.football.api-sports.io/players?id=${playerId}&season=${season}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": API_KEY,
        // Ajout de la clé API dans les en-têtes de la requête
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });
    if (!response.ok) {
      console.error(`Failed to fetch data: ${response.statusText}`);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.response && data.response.length > 0) {
      cache.set(cacheKey, data.response[0]);
      return json(data.response[0], { status: 200 });
    } else {
      return json({ error: "Player not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching player data:", error);
    return json({ error: "Failed to fetch player data" }, { status: 500 });
  }
}
export {
  GET
};
