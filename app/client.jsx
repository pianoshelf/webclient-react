
// Import polyfills first
import 'babel/polyfill';

// Import external modules
import base64 from 'base-64';
import React from 'react';
import Router from 'react-router';

// Import internal modules
import Flux from './Flux';
import routes from './Routes';
import { prefetchRouteData } from './utils/routeutils';

// Create the Flux object
let flux = new Flux();

// Get react-root object
let reactRoot = document.getElementById('react-root');

// Import inline flux data
let inlineData = document.getElementById('react-data').textContent;
flux.deserialize(base64.decode(inlineData));

// Fire up the router
Router.run(routes, Router.HistoryLocation, (Handler, state) => {

  // Function that renders the route.
  let renderRoute = () => {

    // Re-render everything on reactRoot
    React.render(
      <Handler flux={flux} params={state.params} />,
      reactRoot
    );
  };

  // Reset our progress bar
  flux.getActions('progress').resetProgress();

  // Make sure we render our route even if the promise fails.
  prefetchRouteData(state.routes, { flux, state }).then(renderRoute, renderRoute);

});

