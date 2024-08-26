import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
async function getPackStatusFromDB(userId) {
  const sql = `SELECT opened FROM user_packs WHERE user_id = ?`;
  const results = await mysqlDatabase.query(sql, [userId]);
  if (results.length > 0) {
    return { opened: results[0].opened };
  }
  return { opened: false };
}
function getPlayersForPack() {
  return [
    { id: 1, name: "Joueur 1" },
    { id: 2, name: "Joueur 2" }
  ];
}
async function POST({ request }) {
  const userId = (await request.json()).userId;
  const packStatus = await getPackStatusFromDB(userId);
  if (packStatus.opened) {
    return new Response(JSON.stringify({ packOpened: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } else {
    const players = getPlayersForPack();
    return new Response(JSON.stringify({ packOpened: false, selectedPlayers: players }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
export {
  POST
};
