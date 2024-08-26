import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
import { e as error, j as json } from "../../../../chunks/index.js";
async function POST({ request, locals }) {
  const body = await request.json();
  console.log("Request body received:", body);
  const userId = locals.userid;
  console.log("Received country update request:", body.pays);
  console.log("User ID:", userId);
  if (!userId) {
    console.error("No user ID provided");
    return error(400, "User ID is required");
  }
  try {
    const result = await mysqlDatabase.query(
      "UPDATE users SET pays = ? WHERE id = ?",
      [body.pays, userId]
    );
    console.log("Database update result:", result);
    return json({ success: true });
  } catch (err) {
    console.error("Error updating user country:", err);
    return error(500, `Server error: ${err.message}`);
  }
}
export {
  POST
};
