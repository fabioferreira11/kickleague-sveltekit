

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/club/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.D6s2o31x.js","_app/immutable/chunks/scheduler.RIs2sDzR.js","_app/immutable/chunks/index.CgKjrO5Z.js","_app/immutable/chunks/each.NZ2UQc-u.js","_app/immutable/chunks/MenuBurger.UsP7YPYM.js","_app/immutable/chunks/stores.CfeFxaa1.js","_app/immutable/chunks/entry.UYUCkwEJ.js","_app/immutable/chunks/carte-joueur.BWiSuAb-.js"];
export const stylesheets = ["_app/immutable/assets/5.BDBILi80.css","_app/immutable/assets/global.BMRv28qv.css","_app/immutable/assets/MenuBurger.BiDqysdF.css","_app/immutable/assets/carte-joueur.2x861SVM.css"];
export const fonts = ["_app/immutable/assets/freiburginlinepersonaluse-r9kwe-webfont.fiZ28ySq.woff2","_app/immutable/assets/freiburginlinepersonaluse-r9kwe-webfont.CKpXEcF_.woff"];
