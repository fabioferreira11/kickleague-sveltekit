import { g as getSession } from "../../../../chunks/session.js";
import { j as json, e as error } from "../../../../chunks/index.js";
async function GET({ request }) {
  const cookies = request.headers.get("cookie");
  const session = getSession(cookies);
  if (session && session.userid) {
    return json({ userid: session.userid });
  } else {
    return error(401, "No active session found.");
  }
}
export {
  GET
};
