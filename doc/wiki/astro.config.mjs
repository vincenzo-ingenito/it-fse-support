import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = process.env.NODE_ENV === "development" ? undefined : "https://pages.github.ibm.com";

// https://astro.build/config
export default defineConfig({
	site,
	base: "/it-fse-support/fse",
	trailingSlash: 'always',
	outDir: "./docs",
	integrations: [
		starlight({
			title: 'TARIC 2.0',
			defaultLocale: 'it',
			social: {
				github: 'https://github.ibm.com/SOGEI-TARIC',
			},
			sidebar: [
				{
					label: 'Guide',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Configurazione', link: '/servizi/' },
						{ label: 'Analisi AS-IS', link: '/analisi/query' },
						{ label: 'Configurazione Liberty', link: '/liberty' },
					],
				}
			],
			defaultLocale: "root",
			pagination: true,
			lastUpdated: true,
		}),
	],
});
