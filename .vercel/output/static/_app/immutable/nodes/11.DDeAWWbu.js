import{L as Y,M as B,s as W,D as w,k as g,i as _,B as G,e as y,d as b,f as S,q as P,l as C,b as E,j as N,v as H,N as K,p as V,n as j,C as Z}from"../chunks/scheduler.RIs2sDzR.js";import{S as Q,i as X,g as I,a as k,c as O,t as m,b as M,d as z,m as q,f as ee,h as te,e as D,j as A}from"../chunks/index.CgKjrO5Z.js";/* empty css                       */import{H as ne,M as re}from"../chunks/MenuBurger.CLckUUVR.js";import{e as J,u as se,o as ie}from"../chunks/each.NZ2UQc-u.js";import{C as ae}from"../chunks/carte-joueur.BWiSuAb-.js";function oe(c){const e=c-1;return e*e*e+1}function L(c,{delay:e=0,duration:n=400,easing:t=Y}={}){const l=+getComputedStyle(c).opacity;return{delay:e,duration:n,easing:t,css:r=>`opacity: ${r*l}`}}function le(c,{delay:e=0,duration:n=400,easing:t=oe,x:l=0,y:r=0,opacity:o=0}={}){const a=getComputedStyle(c),s=+a.opacity,i=a.transform==="none"?"":a.transform,f=s*(1-o),[p,T]=B(l),[v,h]=B(r);return{delay:e,duration:n,easing:t,css:(u,d)=>`
			transform: ${i} translate(${(1-u)*p}${T}, ${(1-u)*v}${h});
			opacity: ${s-f*d}`}}function F(c,e,n){const t=c.slice();return t[11]=e[n],t[13]=n,t}function ce(c){let e,n,t=[],l=new Map,r,o=J(c[0]);const a=s=>s[11].id;for(let s=0;s<o.length;s+=1){let i=F(c,o,s),f=a(i);l.set(f,t[s]=U(f,i))}return{c(){e=y("div"),n=y("div");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=b(s,"DIV",{class:!0});var i=S(e);n=b(i,"DIV",{class:!0});var f=S(n);for(let p=0;p<t.length;p+=1)t[p].l(f);f.forEach(_),i.forEach(_),this.h()},h(){P(n,"class","player-cards svelte-67rwzq"),P(e,"class","dark-background svelte-67rwzq")},m(s,i){g(s,e,i),C(e,n);for(let f=0;f<t.length;f+=1)t[f]&&t[f].m(n,null);r=!0},p(s,i){i&133&&(o=J(s[0]),I(),t=se(t,i,a,1,s,o,l,n,ie,U,null,F),O())},i(s){if(!r){for(let i=0;i<o.length;i+=1)m(t[i]);r=!0}},o(s){for(let i=0;i<t.length;i+=1)k(t[i]);r=!1},d(s){s&&_(e);for(let i=0;i<t.length;i+=1)t[i].d()}}}function fe(c){let e,n,t;const l=[de,ue],r=[];function o(a,s){return a[4]?0:1}return e=o(c),n=r[e]=l[e](c),{c(){n.c(),t=w()},l(a){n.l(a),t=w()},m(a,s){r[e].m(a,s),g(a,t,s)},p(a,s){let i=e;e=o(a),e===i?r[e].p(a,s):(I(),k(r[i],1,1,()=>{r[i]=null}),O(),n=r[e],n?n.p(a,s):(n=r[e]=l[e](a),n.c()),m(n,1),n.m(t.parentNode,t))},i(a){m(n)},o(a){k(n)},d(a){a&&_(t),r[e].d(a)}}}function R(c){let e,n,t,l,r,o,a,s;return n=new ae({props:{player:c[11],fullWidth:!0}}),{c(){e=y("div"),M(n.$$.fragment),t=E()},l(i){e=b(i,"DIV",{});var f=S(e);z(n.$$.fragment,f),t=N(f),f.forEach(_)},m(i,f){g(i,e,f),q(n,e,null),C(e,t),o=!0,a||(s=H(e,"click",c[7]),a=!0)},p(i,f){const p={};f&1&&(p.player=i[11]),n.$set(p)},i(i){o||(m(n.$$.fragment,i),i&&K(()=>{o&&(r&&r.end(1),l=ee(e,L,{delay:500,duration:500}),l.start())}),o=!0)},o(i){k(n.$$.fragment,i),l&&l.invalidate(),i&&(r=te(e,le,{x:-200,duration:1e3})),o=!1},d(i){i&&_(e),D(n),i&&r&&r.end(),a=!1,s()}}}function U(c,e){let n,t,l,r=e[13]===e[2]&&R(e);return{key:c,first:null,c(){n=w(),r&&r.c(),t=w(),this.h()},l(o){n=w(),r&&r.l(o),t=w(),this.h()},h(){this.first=n},m(o,a){g(o,n,a),r&&r.m(o,a),g(o,t,a),l=!0},p(o,a){e=o,e[13]===e[2]?r?(r.p(e,a),a&5&&m(r,1)):(r=R(e),r.c(),m(r,1),r.m(t.parentNode,t)):r&&(I(),k(r,1,1,()=>{r=null}),O())},i(o){l||(m(r),l=!0)},o(o){k(r),l=!1},d(o){o&&(_(n),_(t)),r&&r.d(o)}}}function ue(c){let e,n='<img src="/img/pack.png" alt="Pack de bienvenue" class="svelte-67rwzq"/> <h3 class="svelte-67rwzq">Pack de bienvenue</h3>',t,l;return{c(){e=y("div"),e.innerHTML=n,this.h()},l(r){e=b(r,"DIV",{class:!0,"data-svelte-h":!0}),V(e)!=="svelte-oyka1l"&&(e.innerHTML=n),this.h()},h(){P(e,"class","pack-image svelte-67rwzq")},m(r,o){g(r,e,o),t||(l=H(e,"click",c[5]),t=!0)},p:j,i:j,o:j,d(r){r&&_(e),t=!1,l()}}}function de(c){let e,n='<img src="/img/pack.png" class="centered-pack svelte-67rwzq" alt="Pack de bienvenue"/>',t,l,r,o;return{c(){e=y("div"),e.innerHTML=n,this.h()},l(a){e=b(a,"DIV",{class:!0,"data-svelte-h":!0}),V(e)!=="svelte-163wi8y"&&(e.innerHTML=n),this.h()},h(){P(e,"class","dark-background svelte-67rwzq")},m(a,s){g(a,e,s),l=!0,r||(o=H(e,"click",c[6]),r=!0)},p:j,i(a){l||(a&&K(()=>{l&&(t||(t=A(e,L,{},!0)),t.run(1))}),l=!0)},o(a){a&&(t||(t=A(e,L,{},!1)),t.run(0)),l=!1},d(a){a&&_(e),a&&t&&t.end(),r=!1,o()}}}function pe(c){let e,n,t,l;const r=[fe,ce],o=[];function a(s,i){return s[3]?s[1]?1:-1:0}return~(e=a(c))&&(n=o[e]=r[e](c)),{c(){n&&n.c(),t=w()},l(s){n&&n.l(s),t=w()},m(s,i){~e&&o[e].m(s,i),g(s,t,i),l=!0},p(s,[i]){let f=e;e=a(s),e===f?~e&&o[e].p(s,i):(n&&(I(),k(o[f],1,1,()=>{o[f]=null}),O()),~e?(n=o[e],n?n.p(s,i):(n=o[e]=r[e](s),n.c()),m(n,1),n.m(t.parentNode,t)):n=null)},i(s){l||(m(n),l=!0)},o(s){k(n),l=!1},d(s){s&&_(t),~e&&o[e].d(s)}}}let _e=!0;function me(c,e,n){let t=[],l=!1,r=0,o=!1,a,s=!1;async function i(){const u=await(await fetch("/api/checkPackStatus",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:a})})).json();if(n(3,o=u.packOpened),!o){const d=await fetch("/api/getPlayerPack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:a})});if(d.ok){const $=await d.json();n(0,t=$.selectedPlayers)}else console.error("Failed to load player pack:",await d.text())}}async function f(){const h=await fetch("/api/openPack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:a,packId:1})});h.ok&&(await h.json()).success&&(n(3,o=!0),n(4,s=!1),n(1,l=!0))}G(async()=>{const h=await fetch("/api/session",{method:"GET",credentials:"include"}),u=await h.json();h.ok&&u.userid?(a=u.userid,i()):console.error("Failed to retrieve user ID:",h.statusText)});function p(){!o&&_e&&n(4,s=!0)}function T(){s&&f()}function v(){r<t.length-1?n(2,r++,r):n(1,l=!1)}return[t,l,r,o,s,p,T,v]}class ke extends Q{constructor(e){super(),X(this,e,me,pe,W,{})}}function he(c){let e,n;return e=new ne({}),{c(){M(e.$$.fragment)},l(t){z(e.$$.fragment,t)},m(t,l){q(e,t,l),n=!0},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){k(e.$$.fragment,t),n=!1},d(t){D(e,t)}}}function ve(c){let e,n;return e=new re({}),{c(){M(e.$$.fragment)},l(t){z(e.$$.fragment,t)},m(t,l){q(e,t,l),n=!0},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){k(e.$$.fragment,t),n=!1},d(t){D(e,t)}}}function ye(c){let e,n,t,l,r,o='<h2 class="svelte-16mn73v">Pack</h2> <p class="svelte-16mn73v">Bienvenue sur la page Pack, où vos récompenses vous attendent ! Après chaque match week, venez ici pour déballer les packs gagnés et découvrir vos nouveaux joueurs. Préparez-vous à enrichir votre club et à renforcer votre équipe pour les prochains tournois.</p>',a,s,i,f,p;const T=[ve,he],v=[];function h(u,d){return u[0]?0:1}return n=h(c),t=v[n]=T[n](c),f=new ke({}),{c(){e=y("main"),t.c(),l=E(),r=y("section"),r.innerHTML=o,a=E(),s=y("section"),i=y("div"),M(f.$$.fragment),this.h()},l(u){e=b(u,"MAIN",{class:!0});var d=S(e);t.l(d),l=N(d),r=b(d,"SECTION",{class:!0,"data-svelte-h":!0}),V(r)!=="svelte-e5bn08"&&(r.innerHTML=o),a=N(d),s=b(d,"SECTION",{class:!0});var $=S(s);i=b($,"DIV",{class:!0});var x=S(i);z(f.$$.fragment,x),x.forEach(_),$.forEach(_),d.forEach(_),this.h()},h(){P(r,"class","pack-text svelte-16mn73v"),P(i,"class","pack svelte-16mn73v"),P(s,"class","section-pack"),P(e,"class","bg-pack svelte-16mn73v")},m(u,d){g(u,e,d),v[n].m(e,null),C(e,l),C(e,r),C(e,a),C(e,s),C(s,i),q(f,i,null),p=!0},p(u,[d]){let $=n;n=h(u),n!==$&&(I(),k(v[$],1,1,()=>{v[$]=null}),O(),t=v[n],t||(t=v[n]=T[n](u),t.c()),m(t,1),t.m(e,l))},i(u){p||(m(t),m(f.$$.fragment,u),p=!0)},o(u){k(t),k(f.$$.fragment,u),p=!1},d(u){u&&_(e),v[n].d(),D(f)}}}function be(c,e,n){let t=!1;function l(){typeof window<"u"&&n(0,t=window.innerWidth<=768)}return G(()=>{typeof window<"u"&&(l(),window.addEventListener("resize",l))}),Z(()=>{typeof window<"u"&&window.removeEventListener("resize",l)}),[t]}class Se extends Q{constructor(e){super(),X(this,e,be,ye,W,{})}}export{Se as component};
