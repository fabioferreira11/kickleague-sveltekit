import { g as getSession } from "../../../../chunks/session.js";
async function GET({ request }) {
  const cookies = request.headers.get("cookie") || "";
  const session = getSession(cookies);
  if (!session.userid) {
    return new Response(JSON.stringify({ error: "No session found" }), { status: 401 });
  }
  return new Response(JSON.stringify({ userId: session.userid }), { status: 200 });
}
export {
  GET
};
