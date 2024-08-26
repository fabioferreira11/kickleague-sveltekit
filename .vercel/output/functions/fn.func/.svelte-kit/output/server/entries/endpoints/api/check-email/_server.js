import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
import { j as json } from "../../../../chunks/index.js";
async function GET({ url }) {
  const email = url.searchParams.get("email");
  if (!email) {
    return json({ error: "Email parameter is missing." }, { status: 400 });
  }
  try {
    const results = await mysqlDatabase.query("SELECT id FROM users WHERE email = ?", [email]);
    return json({ exists: results.length > 0 });
  } catch (err) {
    console.error("Database error:", err);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
export {
  GET
};
