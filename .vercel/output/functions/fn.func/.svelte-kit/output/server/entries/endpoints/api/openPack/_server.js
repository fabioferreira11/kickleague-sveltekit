import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
async function markPackAsOpened(userId, packId = 1) {
  const sqlCheck = `SELECT * FROM user_packs WHERE user_id = ? AND pack_id = ?`;
  const results = await mysqlDatabase.query(sqlCheck, [userId, packId]);
  if (results.length === 0) {
    const sqlInsert = `INSERT INTO user_packs (user_id, pack_id, opened) VALUES (?, ?, true)`;
    await mysqlDatabase.query(sqlInsert, [userId, packId]);
  } else {
    const sqlUpdate = `UPDATE user_packs SET opened = true WHERE user_id = ? AND pack_id = ?`;
    await mysqlDatabase.query(sqlUpdate, [userId, packId]);
  }
  return { success: true };
}
async function POST({ request }) {
  const { userId, packId } = await request.json();
  const result = await markPackAsOpened(userId, packId);
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export {
  POST
};
