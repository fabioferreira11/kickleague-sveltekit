import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
import { g as getSession } from "../../../../chunks/session.js";
async function GET({ request, url }) {
  const session = await getSession(request.headers.get("cookie"));
  const userId = session.userid;
  const position = url.searchParams.get("position");
  if (!userId) {
    console.log("ID utilisateur non trouvé");
    return new Response(JSON.stringify({ error: "Session not found" }), { status: 401 });
  }
  console.log("ID utilisateur:", userId);
  console.log("Position demandée:", position);
  const sql = position === "Tous" ? `SELECT p.id, p.nom, p.photo_url, p.position, p.club FROM players p JOIN user_players up ON p.id = up.player_id WHERE up.user_id = ?` : `SELECT p.id, p.nom, p.photo_url, p.position, p.club FROM players p JOIN user_players up ON p.id = up.player_id WHERE up.user_id = ? AND p.position = ?`;
  try {
    const players = position === "Tous" ? await mysqlDatabase.query(sql, [userId]) : await mysqlDatabase.query(sql, [userId, position]);
    console.log("Joueurs récupérés:", players);
    return new Response(JSON.stringify({ userId, players }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Failed to fetch players:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
export {
  GET
};
