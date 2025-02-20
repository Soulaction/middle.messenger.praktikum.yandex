import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!DOCTYPE html><html><body id="app"></body></html>', {
  url: 'https://example.org/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
