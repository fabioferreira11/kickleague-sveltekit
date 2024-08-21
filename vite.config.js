import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        proxy: {
            // Proxy uniquement pour les routes externes si nécessaire
            // Par exemple, si vous avez des requêtes vers une API externe, configurez ici
            '/api/external': {
                target: 'https://external.api.url',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/external/, '')
            }
            // Ne pas mettre de proxy pour /api/players ou d'autres routes gérées par SvelteKit
        },
        fs: {
            allow: ['static'] // Permettre l'accès à tout ce qui se trouve dans le dossier static
        }
    }
});
