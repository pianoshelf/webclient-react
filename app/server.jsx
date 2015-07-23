
// Import external modules
import base64 from 'base-64';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import FluxComponent from 'flummox/component';
import Helmet from 'react-helmet';
import http from 'http';
import httpProxy from 'http-proxy';
import Location from 'react-router/lib/Location';
import path from 'path';
import queryString from 'query-string';
import React from 'react';
import Router from 'react-router';
import utf8 from 'utf8';

// Import internal modules
import config from '../config';
import Flux from './Flux';
import getRoutes from './utils/getRoutes';
import { prefetchRouteData } from './utils/routeUtils';

// Launch application
let app = express();
let httpServer = http.createServer(app);

// Add our isomorphic constants
global.__SERVER__ = true;
global.__CLIENT__ = false;

// Serve public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Proxy API requests to the python server if we're on a dev environment
if (process.env.NODE_ENV !== 'production') {
  let proxy = httpProxy.createProxyServer({});
  app.use((req, res, next) => {
    if (/^\/api/.test(req.url)) {
      proxy.web(req, res, {
        target: `http://localhost:${config.ports.django}`,
      });
    } else {
      next();
    }
  });
}

app.use(bodyParser.json());
app.use(cookieParser());

// Paths to javascript file and CSS file
let jsPath, cssPath;

// Use build directory as assets
app.use('/assets/', express.static(path.join(__dirname, '..', 'build', 'static')));

cssPath = `/assets/${config.files.css.out}/main.css`;

if (process.env.NODE_ENV === 'production') {
  // If we're in production, we want to make the build directory a static directory in /assets
  jsPath = `/assets/${config.files.client.out}`;
} else {
  // If we're in development, we want to point to webpack-dev-server.
  jsPath = `http://localhost:${config.ports.webpack}/js/${config.files.client.out}`;
}

// Capture all requests
app.use((req, res, next) => {
  // Create Flux object
  let flux = new Flux(req);

  let routes = getRoutes(flux);
  let target = new Location(req.path, req.query);

  Router.run(routes, target, (error, initialState, transition) => {

    // If our transition is cancelled, we redirect the user with a 302.
    if (transition.isCancelled) {
      let { redirectInfo } = transition;
      let { pathname, query } = redirectInfo;
      let url = `${pathname}?${queryString.stringify(query)}`;
      res.redirect(url);
      return;
    }

    // Function that renders the route.
    let renderRoute = () => {
      try {

        // Render our entire app to a string, and make sure we wrap everything
        // with FluxComponent, which adds the flux context to the entire app.
        let renderedString = React.renderToString(
          <FluxComponent flux={flux}>
            <Router {...initialState} />
          </FluxComponent>
        );

        // Base64 encode all the data in our stores.
        let inlineData = base64.encode(utf8.encode(flux.serialize()));

        // Get title, meta, and link tags.
        let { title, meta, link } = Helmet.rewind();

        // Generate boilerplate output.
        let output =
          `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              ${meta}
              <title>${title}</title>
              <link rel="stylesheet" href="${cssPath}" />
              ${link}
            </head>
            <body>
              <div id="react-root">${renderedString}</div>
              <script type="text/inline-data" id="react-data">${inlineData}</script>
              <script src="${jsPath}"></script>
            </body>
          </html>`;

        // Send output to ExpressJS.
        res.send(output);
      } catch (err) {

        // Forward to next request if there's an error.
        next(err);
      }
    };

    // Make sure we render our route even if the promise fails.
    if (initialState.components) {
      prefetchRouteData(initialState.components, { flux, state: initialState })
        .then(renderRoute, renderRoute);
    }
  });
});

// Export the app in the testing environment
if (!!process.env.TESTING) {
  module.exports = app;
} else {

  // Launch application
  httpServer.listen(config.ports.express, () => {
    console.log(`PianoShelf listening on port ${config.ports.express}`); // eslint-disable-line no-console
  });

}

