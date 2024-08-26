import { parse } from "cookie";
async function handle({ event, resolve }) {
  console.log("Handling request:", event.request.url);
  const cookies = event.request.headers.get("cookie");
  if (cookies) {
    const parsedCookies = parse(cookies);
    if (parsedCookies.session_id) {
      event.locals.userid = parsedCookies.session_id;
      console.log("Session ID found:", parsedCookies.session_id);
    } else {
      console.log("No session ID in cookies");
    }
  } else {
    console.log("No cookies found");
  }
  const response = await resolve(event);
  return response;
}
export {
  handle
};
