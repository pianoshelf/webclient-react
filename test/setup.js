'use strict'; // eslint-disable-line strict

// Import JSDOM
import { jsdom } from 'jsdom';

// Set up global.document variable
global.document = jsdom('<!doctype html><html><body></body></html>');

// Set up global.window variable
global.window = document.parentWindow;

