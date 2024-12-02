import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5000,
    },
    css: {
        postcss: './postcss.config.js',
    },
});