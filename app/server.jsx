
// Import external modules
import base64 from 'base-64';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressPromise from 'express-promise';
import http from 'http';
import path from 'path';
import React from 'react';
import Router from 'react-router';

// Import internal modules
import config from '../config';
import Flux from './Flux';
import routes from './Routes';
import { prefetchRouteData } from './utils/routeutils';

// Launch application
let app = express();
let httpServer = http.createServer(app);

// Serve public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Allow returning promises to response object
// app.use(expressPromise);

app.use(bodyParser.json());
app.use(cookieParser());

// Paths to javascript file and CSS file
let jsPath, cssPath;

// Use build directory as assets
app.use('/assets/', express.static(path.join(__dirname, '..', 'build', 'static')));

if (process.env.NODE_ENV === 'production') {
  // If we're in production, we want to make the build directory a static directory in /assets
  jsPath = `/assets/${config.files.client.out}`;
  cssPath = `/assets/${config.files.css.out}/main.css`;
} else {
  // If we're in development, we want to point to webpack-dev-server.
  jsPath = `http://localhost:${config.ports.webpack}/${config.files.client.out}`;
  cssPath = `http://localhost:${config.ports.webpack}/static/${config.files.css.out}/main.css`;
}

// Capture all requests
app.use((req, res, next) => {
  // Create Flux object
  let flux = new Flux(req);

  Router.run(routes, req.path, (Handler, state) => {

    // Function that renders the route.
    let renderRoute = () => {
      try {

        // Render our entire app to a string.
        let renderedString = React.renderToString(
          <Handler flux={flux} params={state.params} />
        );

        // Base64 encode all the data in our stores.
        let inlineData = base64.encode(flux.serialize());

        // Generate boilerplate output.
        let output =
          `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <title>PianoShelf</title>
              <link rel="stylesheet" href="${cssPath}" />
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
    prefetchRouteData(state.routes, { flux, state }).then(renderRoute, renderRoute);
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

