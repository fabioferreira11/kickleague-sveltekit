import { m as mysqlDatabase } from "../../../chunks/mysqlDatabase.js";
import bcrypt from "bcrypt";
import { e as error } from "../../../chunks/index.js";
import { serialize } from "cookie";
async function POST({ request }) {
  const formData = await request.formData();
  const pseudo = formData.get("pseudo");
  const datedenaissance = formData.get("datedenaissance");
  const email = formData.get("email");
  const mdp = formData.get("mdp");
  const confirmmdp = formData.get("confirm_mdp");
  if (!email || !mdp || !confirmmdp || mdp !== confirmmdp) {
    console.log("Validation failed: Passwords must match and all fields must be filled.");
    return error(400, "Please make sure that the passwords match and all fields are filled.");
  }
  let hashedPassword;
  try {
    console.log("Hashing password");
    hashedPassword = await bcrypt.hash(mdp, 10);
  } catch (err) {
    console.error("Error hashing password:", err);
    return error(500, `Server error during hashing: ${err.message}`);
  }
  let userId, sessionCookie;
  try {
    console.log("Inserting user into database");
    const result = await mysqlDatabase.query(
      "INSERT INTO users (pseudo, datedenaissance, email, mdp) VALUES (?, ?, ?, ?)",
      [pseudo, datedenaissance, email, hashedPassword]
    );
    if (result.insertId) {
      userId = result.insertId;
      console.log("User ID set in session:", userId);
      sessionCookie = serialize("session_id", userId.toString(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "Lax",
        secure: false
      });
    } else {
      return error(500, "User registration failed");
    }
  } catch (err) {
    console.error("Error during database insertion:", err);
    return error(500, `Server error during database operation: ${err.message}`);
  }
  console.log("Setting cookie and redirecting to /choixpays");
  return new Response(null, {
    status: 303,
    headers: {
      "Location": "/choixpays",
      "Set-Cookie": sessionCookie
    }
  });
}
export {
  POST
};
