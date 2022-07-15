import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import { name, version } from './package.json';

const interfacePath = path.resolve(__dirname, '../../packages/interface/src');
console.log({ interfacePath });

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 8001
	},
	plugins: [
		react({
			jsxRuntime: 'classic'
		}),
		svgr({
			svgrOptions: {
				icon: true
			}
		})
	],
	root: 'src',
	publicDir: '../../packages/interface/src/assets',
	define: {
		pkgJson: { name, version }
	},
	build: {
		outDir: '../dist',
		assetsDir: '.'
	},
	resolve: {
		alias: {
			'@/': interfacePath
		}
	}
});
