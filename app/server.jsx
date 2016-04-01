
// Import polyfills first
import 'babel-polyfill';

// Import external modules
import base64 from 'base-64';
import bodyParser from 'body-parser';
import bunyan from 'bunyan';
import cookieParser from 'cookie-parser';
import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import Helmet from 'react-helmet';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyStream from 'bunyan-prettystream';
import React from 'react';
import utf8 from 'utf8';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

// Import internal modules
import config from '../config';
import configureStore from './utils/configureStore';
import DevTools from './components/DevTools';
import getRoutes from './utils/getRoutes';
import { getUser } from './actions/login';

// Launch application
const app = express();
const httpServer = http.createServer(app);

// Create logger
const prettyStream = new PrettyStream();
prettyStream.pipe(process.stdout);
const log = bunyan.createLogger({
  name: 'Pianoshelf',
  streams: [
    {
      level: 'debug',
      type: 'raw',
      stream: prettyStream,
    },
  ],
});

// Globalize fetch
global.fetch = fetch;
global.Headers = fetch.Headers;

// Add our isomorphic constants
global.__SERVER__ = true;
global.__CLIENT__ = false;

// Serve public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Proxy API requests to the python server if we're on a dev environment or if we specified the
// override
if (process.env.DOCKER !== 'true' || process.env.NODE_ENV !== 'production') {
  const proxy = httpProxy.createProxyServer({});
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
let jsPath;
let cssPath;

// Use build directory as assets
app.use('/assets/', express.static(path.join(__dirname, '../build/static')));

// Store output files and directory for client JS and CSS files.
const jsOutFile = config.files.client.outFile;
const jsOutDir = config.files.client.out;
const cssOutFile = 'main.css';
const cssOutDir = config.files.css.out;

if (process.env.NODE_ENV === 'production') {
  // In production, our node context will be under the root directory, so we need to include the
  // build folder in our path when getting the manifest file.

  // Get the manifest files for our CSS and JS files
  const jsManifest = JSON.parse(fs.readFileSync('./build/static/js/rev-manifest.json', 'utf-8'));
  const cssManifest = JSON.parse(fs.readFileSync('./build/static/css/rev-manifest.json', 'utf-8'));

  // If we're in production, we want to make the build directory a static directory in /assets
  jsPath = `/assets/${jsOutDir}/${jsManifest[jsOutFile]}`;
  cssPath = `/assets/${cssOutDir}/${cssManifest[cssOutFile]}`;
} else {
  // If we're in development, we want to point to webpack-dev-server.
  jsPath = `http://localhost:${config.ports.webpack}/${jsOutDir}/${jsOutFile}`;
  cssPath = `http://localhost:${config.ports.webpack}/${cssOutDir}/${cssOutFile}`;
}

// Capture all requests
app.use((req, res) => {
  // Get the initial state of our app
  const store = configureStore();

  // Populate store with user authentication information
  store.dispatch(getUser(req)).then(() => {
    // Perform route matching and verification
    match({
      routes: getRoutes(store),
      location: req.url,
    }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        // Redirect if we have to
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        // Return an error if an error occurred
        res.status(500).send(`Server error occurred: ${error.message}`);
      } else if (renderProps === null) {
        // Return 404 if no match occurred
        res.status(404).send('Not Found');
      } else {
        loadOnServer(renderProps, store, {
          request: req,
          location: renderProps.location,
        }).then(() => {
          try {
            // Render our entire app to a string, and make sure we wrap everything
            // with Provider, which adds the redux store to the entire app.
            const renderedString = renderToString(
              <Provider store={store} key="provider">
                <div>
                  <DevTools />
                  <ReduxAsyncConnect {...renderProps} />
                </div>
              </Provider>
            );

            // Base64 encode all the data in our stores.
            const inlineData = base64.encode(utf8.encode(JSON.stringify(store.getState())));

            // Get title, meta, and link tags.
            const { title, meta, link } = Helmet.rewind();

            // Generate boilerplate output.
            const output =
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
                  <script>window.__INITIAL_STATE__ = "${inlineData}";</script>
                  <script src="${jsPath}"></script>
                </body>
              </html>`;

            // Send output to ExpressJS.
            res.send(output);
          } catch (err) {
            log.error('There was a problem renderring the page. Here\'s the error:');
            log.error(err);
            res.status(500).send(err);
          }
        }).catch(err => {
          log.error('There was a problem renderring the page. Here\'s the error:');
          log.error(err);
          res.status(500).send(err);
        });
      }
    });
  });
});

// Export the app in the testing environment
if (!!process.env.TESTING) {
  module.exports = app;
} else {
  // Launch application
  httpServer.listen(config.ports.express, () => {
    log.info(`Pianoshelf listening on port ${config.ports.express}`);
  });
}
