import { r as redirect } from "../../../chunks/index.js";
async function POST({ cookies }) {
  cookies.set("session_id", "", {
    path: "/",
    expires: /* @__PURE__ */ new Date(0),
    httpOnly: true,
    sameSite: "Lax"
  });
  if (typeof window !== "undefined") {
    localStorage.removeItem("userSession");
    localStorage.removeItem("userCompositions");
    console.log("Local storage cleared on logout");
  }
  throw redirect(302, "/");
}
export {
  POST
};
