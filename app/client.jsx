
// Import polyfills first
import 'babel/polyfill';

// Import external modules
import base64 from 'base-64';
import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';
import utf8 from 'utf8';
import { createHistory } from 'history';

// Import internal modules
import Flux from './Flux';
import getRoutes from './utils/getRoutes';

// Create the Flux object
let flux = new Flux();

// Get react-root object
let reactRoot = document.getElementById('react-root');

// Import inline flux data
let inlineData = document.getElementById('react-data').textContent;
flux.deserialize(utf8.decode(base64.decode(inlineData)));

// Create history object for the browser
let browserHistory = createHistory();

// Re-render everything on reactRoot
React.render(
  <FluxComponent flux={flux}>
    <Router history={browserHistory} routes={getRoutes(flux)} />
  </FluxComponent>,
  reactRoot
);

// Reset our progress bar
flux.getActions('progress').resetProgress();

