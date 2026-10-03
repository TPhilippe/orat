// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	redirects: {
		'/boutique': '/catalogue',
		'/boutique/commande': '/shop/cart',
		'/catalogue/commande': '/shop/cart',
	},
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: ['tagged-saturn-written-nice.trycloudflare.com'],
		},
	},
});
