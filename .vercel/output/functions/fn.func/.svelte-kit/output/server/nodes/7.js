

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/connexion/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.B7sKFhQm.js","_app/immutable/chunks/scheduler.RIs2sDzR.js","_app/immutable/chunks/index.CgKjrO5Z.js"];
export const stylesheets = ["_app/immutable/assets/7.ChsxRIuH.css","_app/immutable/assets/global.BMRv28qv.css"];
export const fonts = ["_app/immutable/assets/freiburginlinepersonaluse-r9kwe-webfont.fiZ28ySq.woff2","_app/immutable/assets/freiburginlinepersonaluse-r9kwe-webfont.CKpXEcF_.woff"];
