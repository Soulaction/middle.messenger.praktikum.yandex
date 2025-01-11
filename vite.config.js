import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8000,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      globalModulePaths: [/global\.pcss$/],
      getJSON: () => {
      },
    },
    postcss: './postcss.config.js',
  },
});
