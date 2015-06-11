
// Import external modules
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressPromise from 'express-promise';
import http from 'http';
import React from 'react';
import Router from 'react-router';

// Import internal modules
import config from '../config';
import Flux from './Flux';
import routes from './Routes';

// Launch application
let app = express();
let httpServer = http.createServer(app);

// Allow returning promises to response object
// app.use(expressPromise);

app.use(bodyParser.json());
app.use(cookieParser());

// The path to the compiled JS file in production
let jsPath = '/js/bundle.js';

// If we're in development, we want to point to webpack-dev-server
if (process.env.NODE_ENV !== 'production') {
  app.use('/', express.static('build/static'));
  jsPath = `http://localhost:${config.server.webpack.port}/js/bundle.js`;
}

// Capture all requests
app.use((req, res, next) => {
  // Create Flux object
  let flux = new Flux(req);

  Router.run(routes, req.path, (Handler, state) => {
    let renderedString = React.renderToString(
      <Handler flux={flux} params={state.params} />
    );

    // TODO(ankit): Encode this!
    let inlineData = flux.serialize();

    let output =
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>PianoShelf</title>
        </head>
        <body>
          <div id="react-root">${renderedString}</div>
          <script type="text/inline-data" id="react-data">${inlineData}</script>
          <script src="${jsPath}"></script>
        </body>
      </html>`;

    res.send(output);
    next();
  });


});

// Export the app in the testing environment
if (!!process.env.TESTING) {
  module.exports = app;
} else {

  // Launch application
  httpServer.listen(config.server.dev.port, () => {
    console.log(`PianoShelf listening on port ${config.server.dev.port}`); // eslint-disable-line no-console
  });

}
