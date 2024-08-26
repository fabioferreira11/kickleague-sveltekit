import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
async function POST({ request }) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        // Retourne une erreur 400 si l'ID utilisateur est manquant
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const query = `
            SELECT player_id
            FROM user_players
            WHERE user_id = ?
        `;
    const players = await mysqlDatabase.query(query, [userId]);
    const formattedPlayers = players.map((player) => ({
      id: player.player_id
      // Mappage du champ `player_id` vers `id`
    }));
    return new Response(JSON.stringify(formattedPlayers), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch players" }), {
      status: 500,
      // Retourne une erreur 500 en cas de problème serveur
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
export {
  POST
};
