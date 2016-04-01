'use strict'; // eslint-disable-line strict

// Import external modules
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fetch from 'node-fetch';
import sinonChai from 'sinon-chai';
import { jsdom } from 'jsdom';

// Set up chai addons
chai.use(chaiAsPromised);
chai.use(sinonChai);

// Globalize fetch
global.fetch = fetch;
global.Headers = fetch.Headers;

// Set up global.document variable
global.document = jsdom('<!doctype html><html><body></body></html>');

// Set up global.window variable
global.window = document.parentWindow;

// Set up global server/client variables
global.__SERVER__ = true;
global.__CLIENT__ = false;
