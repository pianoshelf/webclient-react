'use strict'; // eslint-disable-line strict

// Import external modules
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { jsdom } from 'jsdom';

// Set up chai as promised
chai.use(chaiAsPromised);

// Set up global.document variable
global.document = jsdom('<!doctype html><html><body></body></html>');

// Set up global.window variable
global.window = document.parentWindow;

// Set up global server/client variables
global.__SERVER__ = false;
global.__CLIENT__ = false;
