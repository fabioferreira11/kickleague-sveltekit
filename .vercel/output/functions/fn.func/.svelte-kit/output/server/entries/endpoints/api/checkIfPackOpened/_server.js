import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
async function POST({ request }) {
  try {
    const body = await request.json();
    const userId = body.userId;
    const query = `SELECT opened FROM user_packs WHERE user_id = ?;`;
    const results = await mysqlDatabase.query(query, [userId]);
    console.log("DB Query Results:", results);
    if (results.length === 0) {
      console.log("No pack data found for user:", userId);
      return new Response(JSON.stringify({ opened: false }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    }
    const isOpened = Number(results[0].opened) === 1;
    console.log("Pack opened status for user:", userId, isOpened);
    return new Response(JSON.stringify({ opened: isOpened }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error checking pack opened status:", error);
    return new Response(JSON.stringify({ error: "Failed to check pack status" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
export {
  POST
};
