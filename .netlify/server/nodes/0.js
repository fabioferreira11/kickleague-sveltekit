

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DTnFDTkQ.js","_app/immutable/chunks/scheduler.RIs2sDzR.js","_app/immutable/chunks/index.CgKjrO5Z.js"];
export const stylesheets = [];
export const fonts = [];
