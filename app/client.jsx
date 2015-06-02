
// Import polyfills first
import 'babel/polyfill';

// Import external modules
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
// TODO(ankit): Decode data once encoding is implemented
let inlineData = document.querySelector('#react-data').textContent;
flux.deserialize(inlineData);

// Fire up the router
Router.run(routes, Router.HistoryLocation, (Handler, state) => {

  // Re-render everything on reactRoot
  React.render(
    <Handler flux={flux} params={state.params} />,
    reactRoot
  );

});

