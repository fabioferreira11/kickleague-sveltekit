import { m as mysqlDatabase } from "../../../../chunks/mysqlDatabase.js";
import bcrypt from "bcrypt";
import { e as error } from "../../../../chunks/index.js";
import { serialize } from "cookie";
async function POST({ request }) {
  const { email, mdp } = await request.json();
  console.log("Received email:", email);
  console.log("Received password:", mdp);
  try {
    const results = await mysqlDatabase.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log("Query results:", results);
    if (results.length > 0) {
      const user = results[0];
      console.log("User found:", user);
      if (await bcrypt.compare(mdp, user.mdp)) {
        console.log("Password match");
        const sessionCookie = serialize("session_id", user.id.toString(), {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          // Durée de vie d'une semaine pour le cookie
          path: "/",
          sameSite: "Lax",
          secure: false
        });
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Set-Cookie": sessionCookie,
            "Content-Type": "application/json"
          }
        });
      } else {
        console.log("Password mismatch");
        return error(401, "L'email ou le mot de passe que vous avez fournis ne sont pas corrects.");
      }
    } else {
      console.log("No user found");
      return error(401, "L'email ou le mot de passe que vous avez fournis ne sont pas corrects.");
    }
  } catch (err) {
    console.error("Database error:", err);
    return error(500, "Erreur serveur lors de la tentative de connexion");
  }
}
export {
  POST
};
