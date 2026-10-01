// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	redirects: {
		'/boutique': '/catalogue',
		'/boutique/commande': '/catalogue/commande',
	},
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: ['tagged-saturn-written-nice.trycloudflare.com'],
		},
	},
});
