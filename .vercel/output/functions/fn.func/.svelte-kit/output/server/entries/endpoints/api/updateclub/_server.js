import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
import { e as error, j as json } from "../../../../chunks/index.js";
async function POST({ request, locals }) {
  const { club } = await request.json();
  const userId = locals.userid;
  if (!userId) {
    console.error("No user ID provided");
    return error(400, "User ID is required");
  }
  try {
    const result = await mysqlDatabase.query(
      "UPDATE users SET club = ? WHERE id = ?",
      [club, userId]
    );
    console.log("Database update result:", result);
    return json({ success: true });
  } catch (err) {
    console.error("Error updating user club:", err);
    return error(500, `Server error: ${err.message}`);
  }
}
export {
  POST
};
