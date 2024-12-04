import clubIds from '$lib/clubMappings';
import countryMappings from '$lib/paysMappings';

// Constantes pour le proxy, l'ID de la ligue et la saison courante
const PROXY_URL = 'https://kickleague-sveltekit.onrender.com/api';
const LEAGUE_ID = '94';
const season = 2023;

// Fonction utilitaire pour effectuer une requête API via un proxy
async function fetchAPI(url) {
    console.log(`Fetching URL via proxy: ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Data fetched via proxy for url ${url}:`, data);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

// Fonction pour obtenir les joueurs d'un club spécifique pour une saison donnée
export async function getPlayersByClub(clubName, season) {
    const clubId = clubIds[clubName];
    if (!clubId) {
        console.error("No valid ID found for club:", clubName);
        return [];
    }
    console.log(`Fetching players for club ${clubName} with ID ${clubId}`);
    return await fetchPlayersByQuery(`team=${clubId}&season=${season}`);
}

// Fonction pour obtenir les joueurs de la ligue portugaise pour une saison donnée
export async function getPlayersFromPrimeiraLiga(leagueId, season) {
    console.log(`Fetching players from Primeira Liga for season ${season}`);
    return await fetchPlayersByQuery(`league=${leagueId}&season=${season}`);
}

// Fonction pour obtenir les données d'un joueur spécifique pour une saison donnée
export async function getPlayerData(playerId, season) {
    const url = `${PROXY_URL}/players?id=${playerId}&season=${season}`;

    try {
        const response = await fetchAPI(url);

        // Le proxy retourne les données dans un tableau 'response' au lieu de 'player'
        if (response && response.response?.length > 0) {
            const playerData = response.response[0];
            const stat = playerData.statistics[0];
            return {
                player: playerData.player, // Informations sur le joueur
                team: stat.team,           // Informations sur l'équipe du joueur
                games: stat.games          // Statistiques de jeux du joueur
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching data for player ID ${playerId}:`, error);
        return null;
    }
}

// Fonction utilitaire pour récupérer les joueurs en fonction d'une requête
async function fetchPlayersByQuery(query) {
    let allPlayers = [];
    let page = 1;
    let hasMore = true;
    console.log(`Starting fetch query: ${query}`);
    while (hasMore) {
        const url = `${PROXY_URL}/players?${query}&page=${page}`;
        const data = await fetchAPI(url);
        if (data.response) {
            allPlayers = allPlayers.concat(data.response);
            console.log(`Page ${page}: ${data.response.length} players fetched`);
            hasMore = data.paging.current < data.paging.total;
            page++;
        } else {
            console.log(`No more data available after page ${page}`);
            hasMore = false;
        }
    }
    console.log(`Total players fetched with query ${query}: ${allPlayers.length}`);
    return allPlayers;
}

// Fonction pour filtrer les joueurs par pays
export function filterPlayersByCountry(players, country) {
    console.log(`Filtering players for country: ${country}`);
    const filtered = players.filter(player => player.player.nationality === country);
    console.log(`Filtered players count for ${country}: ${filtered.length}`);
    return filtered;
}

// Fonction pour sélectionner des joueurs en fonction de leur position
export async function selectPlayersByPosition(players, position, count) {
    console.log(`Selecting up to ${count} players for position ${position}`);
    if (!Array.isArray(players)) {
        console.error("Expected array of players, received:", players);
        return [];
    }
    const selected = players.filter(player => 
        player.statistics && player.statistics.length > 0 && 
        player.statistics[0].games && 
        player.statistics[0].games.position === position
    ).slice(0, count);
    console.log(`Selected ${selected.length} players for position ${position}`);
    return selected;
}

// Fonction pour obtenir le prochain match d'une équipe spécifique
export async function getNextMatchByTeam(teamId) {
    const url = `${PROXY_URL}/fixtures?team=${teamId}&next=1`;
    console.log(`Fetching next match for team ID ${teamId}`);
    try {
        const response = await fetchAPI(url);
        if (response.response && response.response.length > 0) {
            console.log(`Next match data for team ID ${teamId}:`, response.response[0]);
            return response.response[0];
        } else {
            console.log(`No upcoming match found for team ID ${teamId}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching next match for team ID ${teamId}:`, error);
        throw error;
    }
}