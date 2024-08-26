import { j as json, e as error } from "../../../../chunks/index.js";
import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
const clubIds = {
  "slb": 211,
  // Benfica
  "scp": 228,
  // Sporting
  "fcp": 212,
  // Porto
  "scb": 217,
  // Braga
  "fca": 240,
  // Arouca
  "bfc": 222,
  // Boavista
  "epf": 230,
  // Estoril
  "cpac": 4716,
  // Casa pia
  "gdc": 223,
  // Chaves
  "scf": 231,
  // Farense
  "cfea": 15130,
  // Estrela
  "fcf": 242,
  // Famalicão
  "mfc": 215,
  // Moreirense
  "psc": 216,
  // Portimonense
  "gvfc": 762,
  // Gil vicente
  "rafc": 226,
  // Rio ave
  "vsc": 224,
  // Vitoria de Guimaraes
  "fcv": 810
  // Vizela
};
const countryMappings = {
  "espagne": "Spain",
  "portugal": "Portugal",
  "brasil": "Brazil"
};
const PROXY_URL = "http://localhost:3000/api";
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
  } catch (error2) {
    console.error("Fetch error:", error2);
    throw error2;
  }
}
async function getPlayersByClub(clubName, season) {
  const clubId = clubIds[clubName];
  if (!clubId) {
    console.error("No valid ID found for club:", clubName);
    return [];
  }
  console.log(`Fetching players for club ${clubName} with ID ${clubId}`);
  return await fetchPlayersByQuery(`team=${clubId}&season=${season}`);
}
async function getPlayersFromPrimeiraLiga(leagueId, season) {
  console.log(`Fetching players from Primeira Liga for season ${season}`);
  return await fetchPlayersByQuery(`league=${leagueId}&season=${season}`);
}
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
function filterPlayersByCountry(players, country) {
  console.log(`Filtering players for country: ${country}`);
  const filtered = players.filter((player) => player.player.nationality === country);
  console.log(`Filtered players count for ${country}: ${filtered.length}`);
  return filtered;
}
async function selectPlayersByPosition(players, position, count) {
  console.log(`Selecting up to ${count} players for position ${position}`);
  if (!Array.isArray(players)) {
    console.error("Expected array of players, received:", players);
    return [];
  }
  const selected = players.filter(
    (player) => player.statistics && player.statistics.length > 0 && player.statistics[0].games && player.statistics[0].games.position === position
  ).slice(0, count);
  console.log(`Selected ${selected.length} players for position ${position}`);
  return selected;
}
async function ensurePlayerExists(player) {
  const existingPlayer = await mysqlDatabase.query("SELECT id FROM players WHERE id = ?", [player.player.id]);
  if (existingPlayer.length === 0) {
    await mysqlDatabase.query("INSERT INTO players (id, nom, photo_url, position, age, club, pays) VALUES (?, ?, ?, ?, ?, ?, ?)", [
      player.player.id,
      player.player.name,
      player.player.photo,
      player.statistics[0].games.position,
      player.player.age,
      player.statistics[0].team.name,
      player.player.nationality
    ]);
  }
}
async function getUserAssignedPlayers(userId) {
  return await mysqlDatabase.query(
    `SELECT p.id, p.nom, p.photo_url, p.position, p.age, p.club, p.pays
        FROM user_players up
        JOIN players p ON up.player_id = p.id
        WHERE up.user_id = ?`,
    [userId]
  );
}
async function assignWelcomePackPlayers(userId, players) {
  const validPlayers = players.filter((player) => player && player.player && player.player.id);
  const playerIds = validPlayers.map((player) => player.player.id);
  const queries = playerIds.map(
    (playerId) => mysqlDatabase.query("INSERT INTO user_players (user_id, player_id) VALUES (?, ?)", [userId, playerId])
  );
  await Promise.all(queries);
}
async function synchronizePlayers(season) {
  try {
    const players = await getPlayersFromPrimeiraLiga(94, season);
    for (const player of players) {
      await ensurePlayerExists(player);
    }
    console.log(`Synchronization complete for ${players.length} players.`);
  } catch (err) {
    console.error("Error during player synchronization:", err);
    throw err;
  }
}
async function POST({ request }) {
  const { userId } = await request.json();
  console.log("Fetching player pack for user:", userId);
  try {
    const existingPlayers = await mysqlDatabase.query("SELECT 1 FROM user_players WHERE user_id = ?", [userId]);
    if (existingPlayers.length > 0) {
      const assignedPlayers = await getUserAssignedPlayers(userId);
      return json({ selectedPlayers: assignedPlayers });
    }
    const userDetails = await mysqlDatabase.query("SELECT club, pays FROM users WHERE id = ?", [userId]);
    if (userDetails.length === 0) {
      return error(404, "User not found");
    }
    const { club, pays } = userDetails[0];
    await synchronizePlayers((/* @__PURE__ */ new Date()).getFullYear());
    const allPlayers = await getPlayersFromPrimeiraLiga(94, (/* @__PURE__ */ new Date()).getFullYear());
    const clubPlayers = await getPlayersByClub(club, (/* @__PURE__ */ new Date()).getFullYear());
    const countryPlayers = filterPlayersByCountry(allPlayers, countryMappings[pays.toLowerCase()]);
    const positions = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];
    let selectedPlayers = [];
    for (let position of positions) {
      let fromClub = await selectPlayersByPosition(clubPlayers, position, 1) || [];
      let fromCountry = await selectPlayersByPosition(countryPlayers, position, 1) || [];
      let additionalNeeded = 2 - (fromClub.length + fromCountry.length);
      let additionalPlayers = await selectPlayersByPosition(allPlayers, position, additionalNeeded) || [];
      selectedPlayers.push(...fromClub, ...fromCountry, ...additionalPlayers);
    }
    await assignWelcomePackPlayers(userId, selectedPlayers.slice(0, 8));
    return json({ selectedPlayers: selectedPlayers.slice(0, 8) });
  } catch (error2) {
    console.error("Error processing player pack request:", error2);
    return json({ message: "Internal Error" }, { status: 500 });
  }
}
export {
  POST
};
