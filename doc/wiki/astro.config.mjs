import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = process.env.NODE_ENV === "development" ? undefined : "https://vincenzo-ingenito.github.io";

// https://astro.build/config
export default defineConfig({
	site,
	base: "/it-fse-support/",
	trailingSlash: 'always',
	outDir: "./../docs",
	integrations: [
		starlight({
			title: 'FSE 2.0',
			defaultLocale: 'it',
			sidebar: [
				{
					label: 'Guide',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Configurazione', link: '/servizi/' },
						{ label: 'Crashprogram', link: '/crashprogram' },
					],
				}
			],
			defaultLocale: "root",
			pagination: true,
			lastUpdated: true,
		}),
	],
});
