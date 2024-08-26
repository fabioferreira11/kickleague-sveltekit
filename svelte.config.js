import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Utiliser l'adaptateur Node.js pour le déploiement  
		adapter: adapter()
	}
};

export default config;
