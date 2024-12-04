import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        port: 5000,
    },
    css: {
        postcss: './postcss.config.js',
    },
});