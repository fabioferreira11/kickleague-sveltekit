import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.M6a4cWvB.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.RIs2sDzR.js","_app/immutable/chunks/index.CgKjrO5Z.js","_app/immutable/chunks/button.tlNCqNeg.js"];
export const stylesheets = ["_app/immutable/assets/2.CHISDWjs.css","_app/immutable/assets/global.BMRv28qv.css","_app/immutable/assets/button.wDbnsScZ.css"];
export const fonts = ["_app/immutable/assets/freiburginlinepersonaluse-r9kwe-webfont.fiZ28ySq.woff2","_app/immutable/assets/freiburginlinepersonaluse-r9kwe-webfont.CKpXEcF_.woff"];
