import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","img/arbitre.png","img/arbitre.webp","img/aroucalogo.png","img/arret-peno.png","img/boavistalogo.png","img/bragalogo.png","img/bragalogov2.png","img/brasil.png","img/buts.png","img/carte-jaune.png","img/carte-standard.png","img/carte-standardv2.png","img/casapialogo.png","img/celebration.webp","img/chaveslogo.png","img/clean-sheet.png","img/coach.webp","img/enveloppe.png","img/espagne.png","img/estorillogo.png","img/estrelalogo.png","img/facebook.png","img/famalicaologo.png","img/farenselogo.png","img/faute-grave.png","img/fcplogo.png","img/fcplogov2.png","img/gilvicentelogo.png","img/goal-concede.png","img/goat.png","img/icon-reconpemse.png","img/icon-reconpemseV2.png","img/icon-terrain.png","img/icon-tournoi.png","img/illu-modalgameweek.png","img/illu-modalrank.png","img/illu-modalrank2.png","img/img-connexion.webp","img/imgheroS1_V2.jpg","img/imgheroS2V2.png","img/imgheroV2.jpg","img/instagram.png","img/interception.png","img/joueurenrang.webp","img/kl-logo.png","img/mobile.png","img/moreirenselogo.png","img/pack.png","img/passed.png","img/penalty-commis.png","img/penalty-rate.png","img/penalty.png","img/plus.png","img/portimonenselogo.png","img/portugal.png","img/prime.png","img/pro.png","img/remplacant.png","img/reserve.png","img/rioavelogo.png","img/sauvetagesurlaligne.webp","img/scplogo.png","img/scplogov2.png","img/slblogo.png","img/star.png","img/supporter.webp","img/tacle.png","img/terrain.png","img/tir-cadre.png","img/tir.png","img/titulaire.png","img/vitorialogo.png","img/vizelalogo.png"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.MZwxxwQK.js","app":"_app/immutable/entry/app.B1HGRS3Y.js","imports":["_app/immutable/entry/start.MZwxxwQK.js","_app/immutable/chunks/entry.UYUCkwEJ.js","_app/immutable/chunks/scheduler.RIs2sDzR.js","_app/immutable/entry/app.B1HGRS3Y.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.RIs2sDzR.js","_app/immutable/chunks/index.CgKjrO5Z.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api",
				pattern: /^\/api\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/_server.js'))
			},
			{
				id: "/api/check-email",
				pattern: /^\/api\/check-email\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/check-email/_server.js'))
			},
			{
				id: "/api/checkIfPackOpened",
				pattern: /^\/api\/checkIfPackOpened\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/checkIfPackOpened/_server.js'))
			},
			{
				id: "/api/checkPackStatus",
				pattern: /^\/api\/checkPackStatus\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/checkPackStatus/_server.js'))
			},
			{
				id: "/api/getPlayerPack",
				pattern: /^\/api\/getPlayerPack\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/getPlayerPack/_server.js'))
			},
			{
				id: "/api/getPlayersCompo",
				pattern: /^\/api\/getPlayersCompo\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/getPlayersCompo/_server.js'))
			},
			{
				id: "/api/getUserId",
				pattern: /^\/api\/getUserId\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/getUserId/_server.js'))
			},
			{
				id: "/api/getUserPlayers",
				pattern: /^\/api\/getUserPlayers\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/getUserPlayers/_server.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/login/_server.js'))
			},
			{
				id: "/api/openPack",
				pattern: /^\/api\/openPack\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/openPack/_server.js'))
			},
			{
				id: "/api/players",
				pattern: /^\/api\/players\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/players/_server.js'))
			},
			{
				id: "/api/session",
				pattern: /^\/api\/session\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/session/_server.js'))
			},
			{
				id: "/api/updateclub",
				pattern: /^\/api\/updateclub\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/updateclub/_server.js'))
			},
			{
				id: "/api/updatepays",
				pattern: /^\/api\/updatepays\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/updatepays/_server.js'))
			},
			{
				id: "/choixclub",
				pattern: /^\/choixclub\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/choixpays",
				pattern: /^\/choixpays\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/club",
				pattern: /^\/club\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/compo",
				pattern: /^\/compo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/connexion",
				pattern: /^\/connexion\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/creationdecompte",
				pattern: /^\/creationdecompte\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/gameweek",
				pattern: /^\/gameweek\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/logout/_server.js'))
			},
			{
				id: "/pack",
				pattern: /^\/pack\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/rank",
				pattern: /^\/rank\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/register/_server.js'))
			},
			{
				id: "/tournoi",
				pattern: /^\/tournoi\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
