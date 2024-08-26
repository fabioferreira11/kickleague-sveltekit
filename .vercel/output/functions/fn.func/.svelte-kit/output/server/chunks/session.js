import { parse } from "cookie";
const SESSION_NAME = "session_id";
function getSession(cookies) {
  const cookie = parse(cookies || "");
  return {
    userid: cookie[SESSION_NAME]
    // Retourne l'ID utilisateur associé à la session
  };
}
export {
  getSession as g
};
