import { App } from './App.ts';
import './styles/global.pcss';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.render();
});
