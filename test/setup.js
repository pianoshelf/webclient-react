
// Import JSDOM
let jsdom = require('jsdom');

// Set up global.document variable
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');

// Set up global.window variable
global.window = document.parentWindow;

