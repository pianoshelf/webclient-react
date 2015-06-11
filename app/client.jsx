
// Import polyfills first
import 'babel/polyfill';

// Import external modules
import base64 from 'base-64';
import React from 'react';
import Router from 'react-router';

// Import internal modules
import Flux from './Flux';
import routes from './Routes';

// Create the Flux object
let flux = new Flux();

// Get react-root object
let reactRoot = document.getElementById('react-root');

// Import inline flux data
let inlineData = document.getElementById('react-data').textContent;
flux.deserialize(base64.decode(inlineData));

// Fire up the router
Router.run(routes, Router.HistoryLocation, (Handler, state) => {

  // Re-render everything on reactRoot
  React.render(
    <Handler flux={flux} params={state.params} />,
    reactRoot
  );

});

