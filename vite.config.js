import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
    },
    publicDir: 'src/assets',
    css: {
        postcss: './postcss.config.js',
    },
});