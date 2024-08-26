import { g as getSession } from "../../chunks/session.js";
import { m as mysqlDatabase } from "../../chunks/mysqlDatabase.js";
async function getUserById(userId) {
  const sql = "SELECT * FROM users WHERE id = ?";
  try {
    const user = await mysqlDatabase.query(sql, [userId]);
    return user.length ? user[0] : null;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}
async function load({ request }) {
  const cookies = request.headers.get("cookie");
  const session = getSession(cookies);
  if (!session || !session.userid) {
    console.log("No session or user ID found, clearing any potential stale session.");
    return {
      user: null,
      // Aucun utilisateur n'est connecté
      headers: {
        // Expire immédiatement le cookie de session pour effacer toute session potentiellement obsolète
        "Set-Cookie": "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
      }
    };
  }
  try {
    const user = await getUserById(session.userid);
    if (user) {
      return { user };
    } else {
      console.log("No user found with the ID from session, clearing session cookie.");
      return {
        user: null,
        // L'utilisateur n'existe pas pour cet ID de session
        headers: {
          // Expire le cookie de session si aucun utilisateur correspondant n'est trouvé
          "Set-Cookie": "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
        }
      };
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {
      error: "Failed to load user data",
      // Message d'erreur à retourner si la récupération échoue
      user: null,
      // Aucun utilisateur n'est retourné en cas d'erreur
      headers: {
        // Expire le cookie de session en cas d'erreur pour éviter d'utiliser une session invalide
        "Set-Cookie": "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
      }
    };
  }
}
export {
  load
};
